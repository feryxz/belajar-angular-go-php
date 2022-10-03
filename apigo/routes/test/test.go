package test

import (
	"apigo/lib/db"
	// "apigo/lib/mainlib"

	"github.com/gin-gonic/gin"
)

func TestRoute(router *gin.Engine) {
	group := router.Group("/test/test")
	{
		group.GET("/get", func(context *gin.Context) {
			db := db.KoneksiGorm()
			var callback = gin.H{}
			status := 200

			sql := "SELECT * FROM user LEFT JOIN alamat ON (user.id=alamat.id)"
			result := []map[string]interface{}{}
			db.Raw(sql).Scan(&result)

			callback["success"] = true
			callback["data"] = result

			DB, _ := db.DB()
			defer DB.Close()
			context.JSON(status, callback)
		})

		group.POST("/add", func(context *gin.Context) {
			db := db.KoneksiGorm()
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
			dbinsert := db.Table("user").Create(&insertUser)

			if dbinsert.Error == nil {
				callback["success"] = true
				callback["msg"] = "berhasil menambahkan data user"
			} else {
				callback["success"] = false
				callback["msg"] = "Update Gagal"
			}

			DB, _ := db.DB()
			defer DB.Close()
			context.JSON(200, callback)
		})

		group.POST("/edit", func(context *gin.Context) {
			db := db.KoneksiGorm()
			var callback = gin.H{}

			id := context.PostForm("id")
			nama := context.PostForm("nama")
			email := context.PostForm("email")
			umur := context.PostForm("umur")

			sql := "SELECT * FROM user where id=?"
			result := map[string]interface{}{}
			db.Raw(sql).Scan(&result)

			if len(result)>0{
				sqlUpdate := "UPDATE user SET nama=?, email=?, umur=? WHERE id=?"
			update := db.Exec(sqlUpdate, nama, email, umur, id)

			if update.Error == nil {
				callback["success"] = true
				callback["msg"] = "Data berhasil diupdate"
			} else {
				callback["success"] = false
				callback["msg"] = "Update Gagal"
			} 
			}else{
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
			DB, _ := db.DB()
			defer DB.Close()
			context.JSON(200, callback)
		})

		group.POST("/delete", func(context *gin.Context) {
			db := db.KoneksiGorm()
			var callback = gin.H{}

			id := context.PostForm("id")

			sql := "SELECT * FROM alamat where id=?"
			result := map[string]interface{}{}
			db.Raw(sql).Scan(&result)

			if len(result)>0{
				sqlal := "DELETE FROM alamat WHERE id = ?"
			deleteal := db.Exec(sqlal, id)

			

			if deleteal.Error == nil {
				sqldel := "DELETE FROM user WHERE id = ?"
				delete := db.Exec(sqldel, id)

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
			}else{
				callback["success"] = false
				callback["msg"] = "id tidak ditemukan"
			}
			
			
			DB, _ := db.DB()
			defer DB.Close()
			context.JSON(200, callback)
		})
	}
}
