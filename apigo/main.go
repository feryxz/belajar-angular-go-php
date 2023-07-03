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
	fmt.Println("GO Feryxz ...")
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	routes.RouterController(r)

	r.Run(config.GetPort())
}
