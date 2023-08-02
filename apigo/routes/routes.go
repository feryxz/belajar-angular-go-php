package routes

import (
	product "apigo/routes/products"
	"apigo/routes/test"

	"github.com/gin-gonic/gin"
)

func RouterController(router *gin.Engine) {

	//Contoh
	test.TestRoute(router)
	product.ProductRoute(router)

}
