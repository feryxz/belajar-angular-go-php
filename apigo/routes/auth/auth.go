package auth

import (
	"apigo/models"
	"errors"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type RefreshTokenClaims struct {
	Exp int    `json:"exp"`
	Sub string `json:"sub"`
}

func (c *RefreshTokenClaims) Valid() error {
	if time.Unix(int64(c.Exp), 0).Before(time.Now()) {
		return errors.New("token kadaluwarsa")
	}

	if c.Sub == "" {
		return errors.New("sub kosong")
	}
	return nil
}

func AuthRoute(router *gin.Engine) {
	group := router.Group("/api/auth")
	{
		group.POST("/signup", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			username := context.PostForm("username")
			password := context.PostForm("password")

			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

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
					"msg": "gagal generate token",
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
					"msg": "gagal membuat token",
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
						callback["msg"] = "login sukses"
						callback["access_token"] = accessToken
						callback["refresh_token"] = refreshToken
						callback["user"] = token.Claims
					} else {
						callback["success"] = false
						callback["msg"] = "gagal insert data"
					}
				} else {
					callback["success"] = false
					callback["msg"] = "username atau password salah"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "username atau password salah"
			}
			context.JSON(200, callback)
		})

		group.POST("/get-token", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			token := context.PostForm("token")

			sql := "SELECT token FROM auths WHERE token=?"
			var result map[string]interface{}
			db_select := db_core.Raw(sql, token).Scan(&result)

			if db_select.Error == nil && result["token"] == token {
				callback["success"] = true
				callback["msg"] = "token valid"
				callback["access_token"] = result["token"]
			} else {
				callback["success"] = false
				callback["msg"] = "token tidak valid"
			}
			context.JSON(200, callback)
		})

		group.POST("/get-user", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			tokenValid := context.PostForm("token")

			sql := "SELECT token FROM auths WHERE token=?"
			var result map[string]interface{}
			db_select := db_core.Raw(sql, tokenValid).Scan(&result)

			token, err := jwt.ParseWithClaims(tokenValid, &RefreshTokenClaims{}, func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("REFRESH_TOKEN_KEY")), nil
			})
			if err != nil {
				callback["msg"] = "gagal decode token"
			}

			if claims, ok := token.Claims.(*RefreshTokenClaims); ok && token.Valid {
				userID := claims.Sub
				callback["user"] = userID
			} else {
				callback["msg"] = "token tidak valid"
			}

			if db_select.Error == nil && result["token"] == tokenValid {
				callback["success"] = true
				callback["msg"] = "token valid"
			} else {
				callback["success"] = false
				callback["msg"] = "token tidak valid"
			}
			context.JSON(200, callback)
		})

		group.POST("/refresh-token", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			var user models.User

			tokenValid := context.PostForm("token")

			sql := "SELECT token FROM auths WHERE token=?"
			var result map[string]interface{}
			db_select := db_core.Raw(sql, tokenValid).Scan(&result)

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sub": user.ID,
				"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
			})

			accessToken, err := token.SignedString([]byte(os.Getenv("ACCESS_TOKEN_KEY")))
			if err != nil {
				context.JSON(500, gin.H{
					"message": "gagal generate token",
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
					"message": "gagal generate token",
				})
				return
			}

			insertToken := models.Auth{
				Token: refreshToken,
			}

			db_insert := db_core.Table("auths").Create(&insertToken)

			sql2 := "DELETE FROM auths WHERE token=?"
			db_core.Exec(sql2, tokenValid)

			if db_select.Error == nil && result["token"] == tokenValid {
				if db_insert.Error == nil {
					callback["success"] = true
					callback["msg"] = "berhasil memperbarui token"
					callback["access_token"] = accessToken
					callback["refresh_token"] = refreshToken
					callback["user"] = token.Claims
				} else {
					callback["success"] = false
					callback["msg"] = "gagal memperbarui token"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "token tidak valid"
			}
			context.JSON(200, callback)
		})

		group.POST("/delete-token", func(context *gin.Context) {
			db_core := context.MustGet("db_core").(*gorm.DB)
			var callback = gin.H{}

			token := context.PostForm("token")

			sql := "SELECT token FROM auths WHERE token=?"
			var resultSelect map[string]interface{}
			db_select := db_core.Raw(sql, token).Scan(&resultSelect)

			sql2 := "DELETE FROM auths WHERE token=?"
			db_delete := db_core.Exec(sql2, token)

			if db_select.Error == nil && resultSelect["token"] == token {
				if db_delete.Error == nil {
					callback["success"] = true
					callback["msg"] = "token berhasil dihapus"
				} else {
					callback["success"] = false
					callback["msg"] = "gagal menghapus token"
				}
			} else {
				callback["success"] = false
				callback["msg"] = "token tidak valid"
			}
			context.JSON(200, callback)
		})
	}
}
