package db

import (
	"apigo/config"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func CloseKoneksi(koneksi *gorm.DB) {
	sqlCore, _ := koneksi.DB()
	defer sqlCore.Close()
}

func KoneksiGorm() *gorm.DB {
	setting := config.DB()
	dsn := setting.Username + ":" + setting.Password + "@tcp(" + setting.Host + ":" + setting.Port + ")/" + setting.Database + "?charset=" + setting.Charset + "&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		PrepareStmt: true,
	})

	if err != nil {
		return nil
		// panic(err).
	}

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	return db
}
