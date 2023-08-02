package models

type Product struct {
	ID          string `gorm:"primaryKey;column:id"`
	Title       string `gorm:"column:title"`
	Price       string `gorm:"column:price"`
	Description string `gorm:"column:description"`
	Category    string `gorm:"column:category"`
	Image       string `gorm:"column:image"`
}

type DataTemp struct {
	ID          int     `json:"id"`
	Title       string  `json:"title"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	Category    string  `json:"category"`
	Image       string  `json:"image"`
}

type User struct {
	ID    string `gorm:"primaryKey;column:id"`
	Nama  string `gorm:"column:nama"`
	Email string `gorm:"column:email"`
	Umur  string `gorm:"column:umur"`
}
