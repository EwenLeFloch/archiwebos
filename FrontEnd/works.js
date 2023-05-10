import { openEditor, closeEditor, addWorkEditor } from "./editor.js";

let works = [];
let token;
const categoryButtons = document.querySelector(".portfolio__categories");

try {
	const response = await fetch("http://localhost:5678/api/works");
	const worksData = await response.json();
	works = worksData;

	displayWorks(works, ".gallery");
	displayWorks(works, "#edit__gallery", true);

	const response2 = await fetch("http://localhost:5678/api/categories");
	const categories = await response2.json();

	displayCategories(categories);
	addWorkEditor(categories);
} catch (error) {
	console.error(error);
}

function isLoggedIn() {
	token = localStorage.getItem("token");
	return token !== null;
}

function logOut() {
	localStorage.removeItem("token");
	window.location.href = "login.html";
}

function displayWorks(works, container, isModal = false) {
	const gallery = document.querySelector(container);
	gallery.innerHTML = "";
	for (let work of works) {
		//Figure
		const figureElement = document.createElement("figure");
		gallery.appendChild(figureElement);

		// Ajout d'un identifiant pour la suppression
		const figureId = `works-${work.id}`;
		figureElement.id = figureId;

		if (isModal) {
			//icones
			const deleteButton = document.createElement("button");
			deleteButton.classList.add("delete-button");
			const deleteIcon = document.createElement("i");
			deleteIcon.classList.add("fa-solid", "fa-trash-can");

			deleteButton.appendChild(deleteIcon);
			figureElement.appendChild(deleteButton);

			deleteButton.addEventListener("click", async (event) => {
				event.preventDefault();
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(
						`http://localhost:5678/api/works/${work.id}`,
						{
							method: "DELETE",
							headers: {
								accept: "*/*",
								Authorization: `Bearer ${token}`,
								Contenttype: "application/json",
							},
						}
					);
					if (response.ok) {
						//Suppression dans la modal
						figureElement.remove();

						//Suppression dans l'index.
						const indexFigureElement = document.querySelector(
							`#${figureId}`
						);
						indexFigureElement.remove();
					}
				} catch (error) {
					console.error("Erreur lors de l'envoi des données");
				}
			});

			const moveButton = document.createElement("button");
			moveButton.classList.add("move-button");
			const moveIcon = document.createElement("i");
			moveIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");

			moveButton.appendChild(moveIcon);
			figureElement.appendChild(moveButton);
		}
		// Images
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		imageElement.alt = work.title;
		figureElement.appendChild(imageElement);

		// Figcaption
		const figcaptionElement = document.createElement("figcaption");
		figcaptionElement.innerText = isModal ? "éditer" : work.title;
		figureElement.appendChild(figcaptionElement);
	}
}

function displayCategories(categories) {
	const allCategories = document.querySelector(".tous");

	for (let category of categories) {
		const buttonElement = document.createElement("button");
		buttonElement.classList.add("portfolio__categories__button");
		buttonElement.innerText = category.name;
		categoryButtons.appendChild(buttonElement);

		//Définir la categorie selectionée
		buttonElement.addEventListener("click", () => {
			const activeButton = document.querySelector(".active");
			if (activeButton) {
				activeButton.classList.remove("active");
			}
			buttonElement.classList.add("active");
			const worksToShow = works.filter(
				(work) => work.category.name === category.name
			);
			//Affiche les travaux filtrés
			displayWorks(worksToShow, ".gallery");
		});
		allCategories.addEventListener("click", () => {
			const activeButton = document.querySelector(".active");
			if (activeButton) {
				activeButton.classList.remove("active");
			}
			allCategories.classList.add("active");
			displayWorks(works, ".gallery");
		});
	}
}

function displayEdition() {
	const loginButton = document.querySelector("#login");
	const logoutButton = document.querySelector("#logout");
	const edit = document.getElementsByClassName("edit");

	if (isLoggedIn()) {
		//Navbar
		loginButton.style = "display: none;";
		logoutButton.style = "display: flex;";

		//edit
		for (let i = 0; i < edit.length; i++) {
			edit[i].style = "display: flex;";
		}
		//Filter Bar
		categoryButtons.style = "display: none;";

		//Pour se log out
		logoutButton.addEventListener("click", function () {
			logOut();
		});
	}
}

displayEdition();
openEditor();
closeEditor();
