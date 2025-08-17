package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErorRoutes(r *gin.Engine) {
	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "Halaman tidak ditemukan"})
	})
}
