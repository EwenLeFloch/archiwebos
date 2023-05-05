import { isLoggedIn, logOut } from "./login.js";
import { openEditor, closeEditor } from "./editor.js";

const categoryButtons = document.querySelector(".category-buttons");

//Variable pour stocker les données des travaux récupérés
let works = [];

try {
	const response = await fetch("http://localhost:5678/api/works");
	const worksData = await response.json();
	works = worksData;

	displayWorks(works, ".gallery");
	displayWorks(works, "#edit__gallery", true);

	const response2 = await fetch("http://localhost:5678/api/categories");
	const categories = await response2.json();

	displayCategories(categories);
} catch (error) {
	console.error(error);
}

function displayWorks(works, container, isModal = false) {
	const gallery = document.querySelector(container);
	gallery.innerHTML = "";
	for (let work of works) {
		//Figure
		const figureElement = document.createElement("figure");
		gallery.appendChild(figureElement);
		if (isModal) {
			//icones
			const deleteButton = document.createElement("button");
			deleteButton.classList.add("delete-button");
			const deleteIcon = document.createElement("i");
			deleteIcon.classList.add("fa-solid", "fa-trash-can");

			deleteButton.appendChild(deleteIcon);
			figureElement.appendChild(deleteButton);

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
	allCategories.addEventListener("click", () => {
		displayWorks(works, ".gallery");
	});
	for (let category of categories) {
		const buttonElement = document.createElement("button");
		buttonElement.innerText = category.name;
		categoryButtons.appendChild(buttonElement);

		//Définir la categorie selectionée
		buttonElement.addEventListener("click", () => {
			const activeButton = document.querySelector(".active");
			if (activeButton) {
				activeButton.classList.remove("active");
			}
			buttonElement.classList.add("active");

			const worksToSHow = works.filter(
				(work) => work.category.name === category.name
			);
			//Affiche les travaux filtrés
			displayWorks(worksToSHow, ".gallery");
		});
	}
}

async function displayEdition() {
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
