package main

import (
	"apigo/config"
	"apigo/lib/middleware"
	"apigo/routes"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func init() {
	os.Setenv("TZ", "Asia/Jakarta")
}

func main() {
	fmt.Println("GO Stokhub ...")
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.RouterController(r)
	if config.GetMode() == "prod" {
		r.Run(config.GetPort())
	} else if config.GetMode() == "test" {
		r.Run(config.GetPort())
	} else {
		r.Run()
	}
}
