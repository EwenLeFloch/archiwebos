const loginForm = document.querySelector("#form-login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = emailInput.value;
	const password = passwordInput.value;
	try {
		const response = await fetch("http://localhost:5678/api/users/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			const data = await response.json();
			const token = data.token;
			localStorage.setItem("token", token);
			window.location.href = "index.html";
		} else {
			alert("Adresse email ou mot de passe incorrect");
		}
	} catch (error) {
		console.log(error);
		alert("Une erreur est survenue, veuillez réessayer plus tard.");
	}
});
