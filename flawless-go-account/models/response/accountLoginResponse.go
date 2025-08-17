package response

type AccountLoginResponse struct {
	Username string `json:"username"`
	Jwt      string `json:"token"`
}
