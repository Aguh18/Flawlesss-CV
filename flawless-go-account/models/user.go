package models

import (
	"time"
)

type User struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"` // Primary Key dengan auto increment
	Username  string    `gorm:"size:50;not null;unique"`  // Nama pengguna, harus unik
	Email     string    `gorm:"size:100;not null;unique"` // Email pengguna, harus unik
	Password  string    `gorm:"size:255;not null"`        // Kata sandi (hash)
	FullName  string    `gorm:"size:100"`                 // Nama lengkap
	Role      string    `gorm:"size:20;default:user"`     // Peran pengguna, default 'user'
	CreatedAt time.Time `gorm:"autoCreateTime"`           // Tanggal pembuatan
	UpdatedAt time.Time `gorm:"autoUpdateTime"`           // Tanggal terakhir diperbarui
}

// UserResponse adalah format response untuk data user
type UserResponse struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	FullName  string    `json:"full_name"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
