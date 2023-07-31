package db

import (
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	DBCore *gorm.DB
	DBZis  *gorm.DB
}

type DBSetting struct {
	Host     string
	Username string
	Password string
	Database string
	Port     string
	Charset  string
}

func DBCore() (*gorm.DB, error) {
	// dsn := "username:password@tcp(host:port)/database?charset=utf8mb4&parseTime=True&loc=Local"

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

	// fmt.Println(setting)

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

	return db, nil
}
