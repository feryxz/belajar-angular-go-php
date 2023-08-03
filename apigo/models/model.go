package models

type Product struct {
	ID          string `gorm:"primaryKey;column:id"`
	Title       string `gorm:"column:title;not null"`
	Price       string `gorm:"column:price;not null"`
	Description string `gorm:"column:description;not null"`
	Category    string `gorm:"column:category;not null"`
	Image       string `gorm:"column:image;not null"`
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
	ID       string `gorm:"primaryKey;column:id"`
	Username string `gorm:"column:username;not null"`
	Password string `gorm:"column:password;not null"`
}

type Auth struct {
	Token string `gorm:"column:token;not null"`
}
