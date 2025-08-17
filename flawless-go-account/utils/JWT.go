package utils

import (
	"log"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"

	"account-service/models"
)

func GenerateJWT(user models.User) (string, error) {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error load env")
	}
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["userID"] = user.ID
	claims["username"] = user.Username
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix() // Token expired after 1 hour

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(os.Getenv("JWT_KEY")))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
