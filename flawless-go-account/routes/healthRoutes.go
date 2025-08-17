package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HealthRoutes(r *gin.Engine, db *gorm.DB) {
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "ok",
		})
	})

}
