package routes

import (
	auth "apigo/routes/auth"
	product "apigo/routes/products"

	"github.com/gin-gonic/gin"
)

func RouterController(router *gin.Engine) {

	//Contoh
	// test.TestRoute(router)
	product.ProductRoute(router)
	auth.AuthRoute(router)

}
