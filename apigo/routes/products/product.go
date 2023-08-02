package product

import (
	"apigo/models"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"github.com/xuri/excelize/v2"
	"gorm.io/gorm"
)

type ProductRequest struct {
	Title       string  `json:"title"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
	Image       string  `json:"image"`
}

func ProductRoute(router *gin.Engine) {
	group := router.Group("/api/products")
	{
		group.GET("/get-data", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			client := resty.New()
			resp, err := client.R().
				EnableTrace().
				Get("https://fakestoreapi.com/products")
			if err != nil {
				context.JSON(500, gin.H{
					"message": "failed fetch data",
				})
				return
			}

			var data []models.DataTemp
			err = json.Unmarshal(resp.Body(), &data)
			if err != nil {
				context.JSON(500, gin.H{
					"message": "failed to unmarshal data",
				})
				return
			}

			for _, req := range data {
				product := models.Product{
					ID:          "products" + "-" + strconv.Itoa(req.ID),
					Title:       req.Title,
					Price:       strconv.FormatFloat(req.Price, 'f', 6, 64),
					Description: req.Description,
					Category:    req.Category,
					Image:       req.Image,
				}

				err := db_core.Table("products").Create(&product).Error
				if err != nil {
					context.JSON(500, gin.H{
						"message": "failed to insert data to database",
					})
					return
				}
			}

			context.JSON(200, gin.H{
				"message": "data successfully inserted to database",
			})
		})

		group.GET("/get", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}
			status := 200

			page, _ := strconv.Atoi(context.DefaultQuery("page", "1"))
			pageSize, _ := strconv.Atoi(context.DefaultQuery("page_size", "10"))
			keyword := context.Query("keyword")

			offset := (page - 1) * pageSize

			sql := "SELECT * FROM products"

			if keyword != "" {
				sql += fmt.Sprintf(" WHERE title LIKE '%%%s%%' OR category LIKE '%%%s%%' OR description LIKE '%%%s%%'", keyword, keyword, keyword)
			}

			sql += fmt.Sprintf(" LIMIT %d OFFSET %d", pageSize, offset)

			result := []map[string]interface{}{}
			db_core.Raw(sql).Scan(&result)

			var totalData int64
			if keyword != "" {
				db_core.Table("products").Where("title LIKE ? OR category LIKE ? OR description LIKE ?", "%"+keyword+"%", "%"+keyword+"%", "%"+keyword+"%").Count(&totalData)
			} else {
				db_core.Table("products").Count(&totalData)
			}

			callback["success"] = true
			callback["data"] = result
			callback["length"] = len(result)
			callback["page"] = page
			callback["page_size"] = pageSize
			callback["total_data"] = totalData
			callback["keyword"] = keyword

			context.JSON(status, callback)
		})

		group.POST("/post", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			title := context.PostForm("title")
			price := context.PostForm("price")
			category := context.PostForm("category")
			description := context.PostForm("description")
			// image := context.PostForm("image")
			image, _ := context.FormFile("image")

			id, _ := gonanoid.New(16)

			filename := filepath.Base(image.Filename)
			// path := `http://localhost:3000/uploads/images/` + filename
			if err := context.SaveUploadedFile(image, "../src/assets/imgs/"+filename); err != nil {
				context.String(http.StatusBadRequest, "upload file err: %s", err.Error())
				return
			}

			insertUser := models.Product{
				ID:          "product" + "-" + id,
				Title:       title,
				Price:       price,
				Description: category,
				Category:    description,
				Image:       filename,
			}

			dbinsert := db_core.Table("products").Create(&insertUser)

			if dbinsert.Error == nil {
				callback["success"] = true
				callback["msg"] = "berhasil menambahkan data produk"
			} else {
				callback["success"] = false
				callback["msg"] = "Update Gagal"
			}

			context.JSON(200, callback)
		})

		group.GET("/get/:id", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			id := context.Param("id")

			sql := "SELECT * FROM products where id=?"
			var result map[string]interface{}
			db_core.Raw(sql, id).Scan(&result)

			context.JSON(200, gin.H{
				"data":    result,
				"success": true,
			})
		})

		group.POST("/put", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}

			id := context.PostForm("id")
			title := context.PostForm("title")
			price := context.PostForm("price")
			category := context.PostForm("category")
			description := context.PostForm("description")
			image := context.PostForm("image")

			updateUser := models.Product{
				ID:          id,
				Title:       title,
				Price:       price,
				Description: category,
				Category:    description,
				Image:       image,
			}

			sql := "SELECT * FROM products where id=?"
			result := map[string]interface{}{}
			db_core.Raw(sql, id).Scan(&result)

			if len(result) > 0 {
				sqlUpdate := "UPDATE products SET title=?, price=?, description=?, category=?, image=? WHERE id=?"
				update := db_core.Exec(sqlUpdate, updateUser.Title, updateUser.Price, updateUser.Description, updateUser.Category, updateUser.Image, id)

				if update.Error == nil {
					callback["success"] = true
					callback["msg"] = "Data berhasil diupdate"
				} else {
					callback["success"] = false
					callback["msg"] = "Update Gagal"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "ID tidak ditemukan"
			}
			context.JSON(200, callback)
		})

		group.POST("/delete", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}

			id := context.PostForm("id")

			sql := "SELECT * FROM products where id=?"
			result := map[string]interface{}{}
			db_core.Raw(sql, id).Scan(&result)

			if len(result) > 0 {
				sqlal := "DELETE FROM products WHERE id = ?"
				deleteal := db_core.Exec(sqlal, id)

				if deleteal.Error == nil {
					sqldel := "DELETE FROM products WHERE id = ?"
					delete := db_core.Exec(sqldel, id)

					if delete.Error == nil {
						callback["success"] = true
						callback["msg"] = "Data berhasil dihapus"
					} else {
						callback["success"] = false
						callback["msg"] = "Hapus Gagal"
					}
				} else {
					callback["success"] = false
					callback["msg"] = "Hapus Gagal id tidak ditemukan"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "id tidak ditemukan"
			}

			context.JSON(200, callback)
		})
		group.GET("/export", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			sql := "SELECT * FROM products"
			result := []map[string]interface{}{}
			db_core.Raw(sql).Scan(&result)

			f := excelize.NewFile()

			sheetName := "Sheet1"

			header := map[string]string{
				"A1": "Title",
				"B1": "Price",
				"C1": "Category",
				"D1": "Description",
			}

			for k, v := range header {
				f.SetCellValue(sheetName, k, v)
			}

			for i, d := range result {
				row := i + 2 // Baris data dimulai dari baris kedua
				f.SetCellValue(sheetName, "A"+strconv.Itoa(row), d["title"])
				f.SetCellValue(sheetName, "B"+strconv.Itoa(row), d["price"])
				f.SetCellValue(sheetName, "C"+strconv.Itoa(row), d["category"])
				f.SetCellValue(sheetName, "D"+strconv.Itoa(row), d["description"])
			}

			filePath := "export/file/data.xlsx"
			err := f.SaveAs(filePath)
			if err != nil {
				context.String(500, "Failed to save Excel file")
				return
			}

			context.Writer.Header().Set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
			context.Writer.Header().Set("Content-Disposition", "attachment; filename=data.xlsx")
			context.File(filePath)
		})
	}
}
