const loginForm = document.querySelector("form");
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
			const token = await response.json();
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

export function isLoggedIn() {
	const token = localStorage.getItem("token");
	return token !== null;
}
