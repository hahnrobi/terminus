export default function ({ route, redirect }) {
	if(route.path == "/login" || route.path == "/login/"){
		redirect("/auth/login")
	}
	return;
}