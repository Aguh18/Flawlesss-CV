package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"account-service/handler"
)

func AccountRoutes(r *gin.Engine, db *gorm.DB) {
	r.POST("/register", func(ctx *gin.Context) {
		handler.AccountRegister(ctx, db)
	})

	r.POST("/login", func(ctx *gin.Context) {
		handler.AccountLogin(ctx, db)
	})
}
