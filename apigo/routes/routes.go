package routes

import (
	"apigo/routes/test"

	"github.com/gin-gonic/gin"
)

func RouterController(router *gin.Engine) {

	//Contoh
	test.TestRoute(router)
}
