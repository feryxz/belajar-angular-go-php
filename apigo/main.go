package main

import (
	"apigo/config"
	"apigo/lib/db"
	"apigo/lib/middleware"
	"apigo/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	os.Setenv("TZ", "Asia/Jakarta")
}

func main() {
	r := gin.Default()

	db_core, err := db.DBCore()
	if err != nil {
		panic(err)
	}

	DBCore, _ := db_core.DB()
	defer DBCore.Close()

	r.Use(func(c *gin.Context) {
		c.Set("db_core", db_core)
		c.Next()
	})
	r.Use(middleware.CORSMiddleware())
	routes.RouterController(r)

	r.Run(config.GetPort())
}
