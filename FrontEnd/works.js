const gallery = document.querySelector(".gallery");
const categoryButtons = document.querySelector(".category-buttons");
//Variable pour stocker les données des travaux récupérés
let works = [];
try {
	const response = await fetch("http://localhost:5678/api/works");
	const worksData = await response.json();
	works = worksData;

	displayWorks(works);

	const response2 = await fetch("http://localhost:5678/api/categories");
	const categories = await response2.json();

	displayCategories(categories);
} catch (error) {
	console.error(error);
}

function displayWorks(works) {
	gallery.innerHTML = "";
	for (let work of works) {
		//Vérifie si le travail appartient à la catégorie sélectionnée
		//Figure
		const figureElement = document.createElement("figure");
		gallery.appendChild(figureElement);

		// Images
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		imageElement.alt = work.title;
		figureElement.appendChild(imageElement);

		// Figcaption
		const figcaptionElement = document.createElement("figcaption");
		figcaptionElement.innerText = work.category.name;
		figureElement.appendChild(figcaptionElement);
	}
}

function displayCategories(categories) {
	const allCategories = document.querySelector(".tous");
	allCategories.addEventListener("click", () => {
		displayWorks(works);
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
			displayWorks(worksToSHow);
		});
	}
}
