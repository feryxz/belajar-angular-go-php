package main

import (
	"apigo/models"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DBSetting struct {
	Host     string
	Username string
	Password string
	Database string
	Port     string
	Charset  string
}

type Database struct {
	DBCore *gorm.DB
	DBZis  *gorm.DB
}

func DBCore() (*gorm.DB, error) {
	var err error

	env := godotenv.Load(".env")
	if env != nil {
		fmt.Println("environment variables error")
	}
	setting := DBSetting{
		Host:     os.Getenv("DB_CORE_HOST"),
		Username: os.Getenv("DB_CORE_USERNAME"),
		Password: os.Getenv("DB_CORE_PASSWORD"),
		Database: os.Getenv("DB_CORE_DATABASE"),
		Port:     os.Getenv("DB_CORE_PORT"),
		Charset:  "utf8",
	}

	dsn := setting.Username + ":" + setting.Password + "@tcp(" + setting.Host + ":" + setting.Port + ")/" + setting.Database + "?charset=" + setting.Charset + "&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		PrepareStmt: true,
	})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	sqlDB.SetMaxIdleConns(10)  // Jumlah maksimum koneksi idle
	sqlDB.SetMaxOpenConns(100) // Jumlah maksimum koneksi terbuka

	fmt.Println("database connect")

	db.AutoMigrate(&models.Product{}, models.User{}, models.Auth{})

	fmt.Println("Migrations success!")

	return db, nil
}

func main() {
	DBCore()
}
