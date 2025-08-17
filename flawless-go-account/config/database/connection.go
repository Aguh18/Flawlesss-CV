package database

import (
	"log"
	"os"

	"account-service/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error load env")
	}

	// https://github.com/go-gorm/postgres
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  os.Getenv("POSTGRES_URL"),
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connect to database")
		panic(err)

	}

	print("Connected to database")

	// Migrasi otomatis tabel User
	db.AutoMigrate(&models.User{})

	return db
}

// func Migrate(db *gorm.DB) {
// 	db.AutoMigrate(&models.Books{})

// 	data := models.Books{}
// 	if db.Find(&data).RecordNotFound() {
// 		seederBook(db)
// 	}
// }

// func seederBook(db *gorm.DB) {
// 	data := []models.Books{{
// 		Title:       "Perjalanan Ini",
// 		Author:      "Jojo",
// 		Description: "Buku tentang perjalanan",
// 		Stock:       10,
// 	}, {
// 		Title:       "Pengobatan Herbal",
// 		Author:      "Sindy",
// 		Description: "Buku tentang pengobatan",
// 		Stock:       5,
// 	}, {
// 		Title:       "Seputar Hewan",
// 		Author:      "Kiki",
// 		Description: "Buku tentang hewan",
// 		Stock:       7,
// 	}, {
// 		Title:       "Berita terkini",
// 		Author:      "Sindy",
// 		Description: "Buku tentang berita",
// 		Stock:       5,
// 	}}

// 	for _, v := range data {
// 		db.Create(&v)
// 	}
// }
