const loginForm = document.querySelector("#login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#login__error");

loginForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = emailInput.value;
	const password = passwordInput.value;
	try {
		const response = await fetch(
			"https://archiwebos.onrender.com/api/users/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		if (response.ok) {
			const data = await response.json();
			const token = data.token;
			localStorage.setItem("token", token);
			window.location.href = "index.html";
		} else {
			errorMessage.style.display = "block";
		}
	} catch (error) {
		console.log(error);
		alert("Une erreur est survenue, veuillez réessayer plus tard.");
	}
});
