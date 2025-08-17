package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"account-service/models"
	"account-service/models/request/user"
	"account-service/models/response"
	"account-service/utils"
)

// AccountRegister is a function to handle register account
func AccountRegister(ctx *gin.Context, db *gorm.DB) {

	GeneralResponse := response.GeneralResponse{}
	input := user.RegisterRequest{}

	if err := ctx.BindJSON(&input); err != nil {
		GeneralResponse.Message = "Invalid input"
		GeneralResponse.Status = "400"

		ctx.JSON(http.StatusBadRequest, GeneralResponse)
		return
	}

	hashedpassword, err := utils.HashPassword(input.Password)
	if err != nil {
		GeneralResponse.Message = "Failed to hash password"
		GeneralResponse.Status = "500"
		ctx.JSON(http.StatusInternalServerError, GeneralResponse)
		return
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: hashedpassword,
	}

	if err := db.Create(&user); err.Error != nil {
		GeneralResponse.Message = "Failed create user"
		GeneralResponse.Status = "500"

		ctx.JSON(http.StatusInternalServerError, GeneralResponse)
		return
	}

	GeneralResponse.Message = "Success create user"
	GeneralResponse.Status = "200"

	ctx.JSON(http.StatusOK, GeneralResponse)

}

// AccountLogin is a function to handle login account
func AccountLogin(ctx *gin.Context, db *gorm.DB) {
	Response := response.AccountLoginResponse{}
	GeneralResponse := response.GeneralResponse{}
	input := user.LoginRequest{}

	if err := ctx.BindJSON(&input); err != nil {
		GeneralResponse.Message = "Invalid input"
		GeneralResponse.Status = "400"

		ctx.JSON(http.StatusBadRequest, GeneralResponse)
		return
	}

	var user models.User
	if err := db.First(&user, models.User{Email: input.Email}).Error; err != nil {

		// Pengguna tidak ditemukan
		GeneralResponse.Message = err.Error()
		GeneralResponse.Status = "404"

		ctx.JSON(http.StatusNotFound, GeneralResponse)
		return

	}

	if !utils.CompareHashedPassword(input.Password, user.Password) {
		// Password tidak sesuai
		GeneralResponse.Message = "Email or password is incorrect"
		GeneralResponse.Status = "400"

		ctx.JSON(http.StatusBadRequest, GeneralResponse)
		return
	}

	jwt, err := utils.GenerateJWT(user)
	if err != nil {
		GeneralResponse.Message = "Failed to generate JWT"
		GeneralResponse.Status = "500"

		ctx.JSON(http.StatusInternalServerError, GeneralResponse)
		return
	}

	GeneralResponse.Message = "Success login"
	GeneralResponse.Status = "200"

	Response.Username = user.Username
	Response.Jwt = jwt

	ctx.JSON(http.StatusOK, Response)

}
