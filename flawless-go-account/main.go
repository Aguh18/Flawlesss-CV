package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"account-service/config/database"
	"account-service/routes"
)

// var router *gin.Engine

func main() {

	db := database.InitDB()
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // Izinkan semua asal
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	routes.AccountRoutes(router, db)
	routes.ErorRoutes(router)
	routes.HealthRoutes(router, db)

	router.Run(":8080")
}
