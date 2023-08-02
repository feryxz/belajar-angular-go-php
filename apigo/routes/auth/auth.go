package auth

import (
	"apigo/models"
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func AuthRoute(router *gin.Engine) {
	group := router.Group("/api/auth")
	{
		group.POST("/signup", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			username := context.PostForm("username")
			password := context.PostForm("password")

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
			if err != nil {
				panic(err)
			}

			id, _ := gonanoid.New(16)

			signUp := models.User{
				ID:       "user" + "-" + id,
				Username: username,
				Password: string(hashedPassword),
			}

			dbinsert := db_core.Table("users").Create(&signUp)

			if dbinsert.Error == nil {
				callback["success"] = true
				callback["msg"] = "berhasil menambahkan data user"
			} else {
				callback["success"] = false
				callback["msg"] = "Update Gagal"
			}

			context.JSON(200, callback)
		})

		group.POST("/login", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			username := context.PostForm("username")
			password := context.PostForm("password")

			var user models.User

			db_select := db_core.Table("users").Where("username = ?", username).First(&user)

			compare := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": user.ID,
				"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
			})

			accessToken, err := token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_KEY")))
			if err != nil {
				context.JSON(500, gin.H{
					"message": "failed to created token",
				})
				return
			}

			token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": user.ID,
				"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
			})

			refreshToken, err := token.SignedString([]byte(os.Getenv("REFRESH_TOKEN_KEY")))
			if err != nil {
				context.JSON(500, gin.H{
					"message": "failed to created token",
				})
				return
			}

			insertToken := models.Auth{
				Token: refreshToken,
			}

			dbinsert := db_core.Table("auths").Create(&insertToken)

			if db_select.Error == nil {
				if compare == nil {
					if dbinsert.Error == nil {
						callback["success"] = true
						callback["msg"] = "login succes"
						callback["access_token"] = accessToken
						callback["refresh_token"] = refreshToken
						callback["user"] = token.Claims
					} else {
						callback["success"] = false
						callback["msg"] = "failed insert data"
					}
				} else {
					callback["success"] = false
					callback["msg"] = "invalid username or password"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "invalid username or password"
			}
			context.JSON(200, callback)
		})

		group.POST("/get-token", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			token := context.PostForm("token")

			fmt.Println(token)

			sql := "SELECT token FROM auths WHERE token=?"
			var result map[string]interface{}
			db_select := db_core.Raw(sql, token).Scan(&result)

			// fmt.Println(result)

			if db_select.Error == nil {
				callback["success"] = true
				callback["msg"] = "token valid"
				callback["access_token"] = result
			} else {
				callback["success"] = false
				callback["msg"] = "invalid token"
			}
			context.JSON(200, callback)
		})

		// group.POST("/refresh-token", func(context *gin.Context) {
		// 	db_core := context.MustGet("db_core").(*gorm.DB)
		// 	var callback = gin.H{}

		// 	tokenValid := context.PostForm("token")
		// 	// password := context.PostForm("password")

		// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// 		"sub": user.ID,
		// 		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
		// 	})

		// 	accessToken, err := token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_KEY")))
		// 	if err != nil {
		// 		context.JSON(500, gin.H{
		// 			"message": "failed to created token",
		// 		})
		// 		return
		// 	}

		// 	token = jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		// 		"sub": user.ID,
		// 		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
		// 	})

		// 	refreshToken, err := token.SignedString([]byte(os.Getenv("REFRESH_TOKEN_KEY")))
		// 	if err != nil {
		// 		context.JSON(500, gin.H{
		// 			"message": "failed to created token",
		// 		})
		// 		return
		// 	}

		// 	insertToken := models.Auth{
		// 		Token: refreshToken,
		// 	}

		// 	dbinsert := db_core.Table("auths").Create(&insertToken)

		// 	if db_select.Error == nil {
		// 		if compare == nil {
		// 			if dbinsert.Error == nil {
		// 				callback["success"] = true
		// 				callback["msg"] = "login succes"
		// 				callback["access_token"] = accessToken
		// 				callback["refresh_token"] = refreshToken
		// 				callback["user"] = token.Claims
		// 			} else {
		// 				callback["success"] = false
		// 				callback["msg"] = "failed insert data"
		// 			}
		// 		} else {
		// 			callback["success"] = false
		// 			callback["msg"] = "invalid username or password"
		// 		}
		// 	} else {
		// 		callback["success"] = false
		// 		callback["msg"] = "invalid username or password"
		// 	}
		// 	context.JSON(200, callback)
		// })
	}
}
