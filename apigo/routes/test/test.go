package test

import (

	// "apigo/lib/mainlib"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func TestRoute(router *gin.Engine) {
	group := router.Group("/test/test")
	{
		group.GET("/get", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}
			status := 200

			sql := "SELECT * FROM user LEFT JOIN alamat ON (user.id=alamat.id)"
			result := []map[string]interface{}{}
			db_core.Raw(sql).Scan(&result)

			callback["success"] = true
			callback["data"] = result

			context.JSON(status, callback)
		})

		group.POST("/add", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			nama := context.PostForm("nama")
			email := context.PostForm("email")
			umur := context.PostForm("umur")

			type User struct {
				Id    int `gorm:"primaryKey"` // returm lastinsertID
				Nama  string
				Email string
				Umur  string
			}

			insertUser := User{
				Nama:  nama,
				Email: email,
				Umur:  umur,
			}
			dbinsert := db_core.Table("user").Create(&insertUser)

			if dbinsert.Error == nil {
				callback["success"] = true
				callback["msg"] = "berhasil menambahkan data user"
			} else {
				callback["success"] = false
				callback["msg"] = "Update Gagal"
			}

			context.JSON(200, callback)
		})

		group.POST("/edit", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}

			id := context.PostForm("id")
			nama := context.PostForm("nama")
			email := context.PostForm("email")
			umur := context.PostForm("umur")

			sql := "SELECT * FROM user where id=?"
			result := map[string]interface{}{}
			db_core.Raw(sql).Scan(&result)

			if len(result) > 0 {
				sqlUpdate := "UPDATE user SET nama=?, email=?, umur=? WHERE id=?"
				update := db_core.Exec(sqlUpdate, nama, email, umur, id)

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
			/*
				sqlUpdate := "UPDATE user SET nama=?, email=?, umur=? WHERE id=?"
				update := db.Exec(sqlUpdate, nama, email, umur, id)

				if update.Error == nil {
					callback["success"] = true
					callback["msg"] = "Data berhasil diupdate"
				} else {
					callback["success"] = false
					callback["msg"] = "Update Gagal"
				}
			*/
			context.JSON(200, callback)
		})

		group.POST("/delete", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)

			var callback = gin.H{}

			id := context.PostForm("id")

			sql := "SELECT * FROM alamat where id=?"
			result := map[string]interface{}{}
			db_core.Raw(sql).Scan(&result)

			if len(result) > 0 {
				sqlal := "DELETE FROM alamat WHERE id = ?"
				deleteal := db_core.Exec(sqlal, id)

				if deleteal.Error == nil {
					sqldel := "DELETE FROM user WHERE id = ?"
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
	}
}
