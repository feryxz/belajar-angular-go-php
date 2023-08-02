package test

// import (

// 	// "apigo/lib/mainlib"

// 	"apigo/models"
// 	"fmt"
// 	"strconv"

// 	"github.com/gin-gonic/gin"
// 	gonanoid "github.com/matoous/go-nanoid/v2"
// 	"gorm.io/gorm"
// )

// func TestRoute(router *gin.Engine) {
// 	group := router.Group("/test")
// 	{
// 		group.GET("/get", func(context *gin.Context) {
// 			db_core := context.MustGet("db_core").(*gorm.DB)

// 			var callback = gin.H{}
// 			status := 200

// 			page, _ := strconv.Atoi(context.DefaultQuery("page", "1"))
// 			pageSize, _ := strconv.Atoi(context.DefaultQuery("page_size", "10"))

// 			offset := (page - 1) * pageSize

// 			sql := fmt.Sprintf("SELECT * FROM products LIMIT %d OFFSET %d", pageSize, offset)
// 			result := []map[string]interface{}{}
// 			db_core.Raw(sql).Scan(&result)

// 			var totalData int64
// 			db_core.Table("products").Count(&totalData)

// 			callback["success"] = true
// 			callback["data"] = result
// 			callback["length"] = len(result)
// 			callback["page"] = page
// 			callback["size"] = pageSize
// 			callback["total_data"] = totalData

// 			context.JSON(status, callback)
// 		})

// 		group.POST("/add", func(context *gin.Context) {
// 			db_core := context.MustGet("db_core").(*gorm.DB)
// 			var callback = gin.H{}

// 			nama := context.PostForm("nama")
// 			email := context.PostForm("email")
// 			umur := context.PostForm("umur")

// 			// type User struct {
// 			// 	Id    int `gorm:"primaryKey"` // returm lastinsertID
// 			// 	Nama  string
// 			// 	Email string
// 			// 	Umur  string
// 			// }

// 			id, _ := gonanoid.New(16)

// 			insertUser := models.User{
// 				ID:    "user" + "-" + id,
// 				Nama:  nama,
// 				Email: email,
// 				Umur:  umur,
// 			}
// 			dbinsert := db_core.Table("users").Create(&insertUser)

// 			if dbinsert.Error == nil {
// 				callback["success"] = true
// 				callback["msg"] = "berhasil menambahkan data user"
// 			} else {
// 				callback["success"] = false
// 				callback["msg"] = "Update Gagal"
// 			}

// 			context.JSON(200, callback)
// 		})

// 		group.POST("/edit", func(context *gin.Context) {
// 			db_core := context.MustGet("db_core").(*gorm.DB)

// 			var callback = gin.H{}

// 			id := context.PostForm("id")
// 			nama := context.PostForm("nama")
// 			email := context.PostForm("email")
// 			umur := context.PostForm("umur")

// 			sql := "SELECT * FROM user where id=?"
// 			result := map[string]interface{}{}
// 			db_core.Raw(sql).Scan(&result)

// 			if len(result) > 0 {
// 				sqlUpdate := "UPDATE user SET nama=?, email=?, umur=? WHERE id=?"
// 				update := db_core.Exec(sqlUpdate, nama, email, umur, id)

// 				if update.Error == nil {
// 					callback["success"] = true
// 					callback["msg"] = "Data berhasil diupdate"
// 				} else {
// 					callback["success"] = false
// 					callback["msg"] = "Update Gagal"
// 				}
// 			} else {
// 				callback["success"] = false
// 				callback["msg"] = "ID tidak ditemukan"
// 			}
// 			/*
// 				sqlUpdate := "UPDATE user SET nama=?, email=?, umur=? WHERE id=?"
// 				update := db.Exec(sqlUpdate, nama, email, umur, id)

// 				if update.Error == nil {
// 					callback["success"] = true
// 					callback["msg"] = "Data berhasil diupdate"
// 				} else {
// 					callback["success"] = false
// 					callback["msg"] = "Update Gagal"
// 				}
// 			*/
// 			context.JSON(200, callback)
// 		})

// 		group.POST("/delete", func(context *gin.Context) {
// 			db_core := context.MustGet("db_core").(*gorm.DB)

// 			var callback = gin.H{}

// 			id := context.PostForm("id")

// 			sql := "SELECT * FROM alamat where id=?"
// 			result := map[string]interface{}{}
// 			db_core.Raw(sql).Scan(&result)

// 			if len(result) > 0 {
// 				sqlal := "DELETE FROM alamat WHERE id = ?"
// 				deleteal := db_core.Exec(sqlal, id)

// 				if deleteal.Error == nil {
// 					sqldel := "DELETE FROM user WHERE id = ?"
// 					delete := db_core.Exec(sqldel, id)

// 					if delete.Error == nil {
// 						callback["success"] = true
// 						callback["msg"] = "Data berhasil dihapus"
// 					} else {
// 						callback["success"] = false
// 						callback["msg"] = "Hapus Gagal"
// 					}
// 				} else {
// 					callback["success"] = false
// 					callback["msg"] = "Hapus Gagal id tidak ditemukan"
// 				}
// 			} else {
// 				callback["success"] = false
// 				callback["msg"] = "id tidak ditemukan"
// 			}

// 			context.JSON(200, callback)
// 		})
// 	}
// }
