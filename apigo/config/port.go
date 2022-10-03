package config

func GetPort() string {

	if GetMode() == "prod" {
		return ":9921"
	} else if GetMode() == "test" {
		return ":3021"
	} else {
		return ":3000"
	}
}
