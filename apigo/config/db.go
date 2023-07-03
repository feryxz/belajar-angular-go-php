package config

type DBSetting struct {
	Host     string
	Username string
	Password string
	Database string
	Port     string
	Charset  string
}

func DB() DBSetting {
	var setting DBSetting
	if GetMode() == "prod" {
		setting.Host = "localhost"
		setting.Username = "test"
		setting.Password = "uwu"
		setting.Database = "stokhub"
		setting.Port = "3306"
		setting.Charset = "utf8"
	} else if GetMode() == "test" {
		setting.Host = "localhost"
		setting.Username = "test"
		setting.Password = "uwu"
		setting.Database = "stokhub_2"
		setting.Port = "3306"
		setting.Charset = "utf8"
	} else {
		setting.Host = "localhost"
		setting.Username = "root"
		setting.Password = ""
		setting.Database = "cobacoba"
		//setting.Database = "testgit"
		setting.Port = "3306"
		setting.Charset = "utf8"
	}
	return setting
}
