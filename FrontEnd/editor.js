export function openEditor() {
	const dialog = document.querySelector("#dialog");
	const showButton = document.querySelector("#showDialog");

	showButton.addEventListener("click", () => {
		dialog.showModal();
		dialog.style = "display : flex;";
	});
}

export function closeEditor() {
	const dialog = document.querySelector("#dialog");
	const closeButton = document.querySelectorAll(".cancel");

	closeButton.forEach((element) =>
		element.addEventListener("click", () => {
			dialog.close();
			dialog.style = "display: none;";
		})
	);

	dialog.addEventListener("mousedown", (e) => {
		if (e.button == 0 && e.target == dialog) {
			dialog.close();
			dialog.style = "display: none;";
		}
	});
}

export function addWorkEditor(categories) {
	const deleteModal = document.querySelector(".delete-modal");
	const addModal = document.querySelector(".add-modal");
	const addWork = document.querySelector("#addWork");
	const returnButton = document.querySelector("#back");

	//Permet de visualiser l'image selectionee

	const selectCategory = document.querySelector("#category");

	//On cree les options avec les nomns des categories
	for (let category of categories) {
		const categoryOption = document.createElement("option");
		categoryOption.innerText = category.name;
		categoryOption.value = category.id;
		selectCategory.appendChild(categoryOption);
	}

	//Permet de retourner en arriere ou quitter l'editeur
	addWork.addEventListener("click", () => {
		deleteModal.style = "display: none;";
		addModal.style = "display: flex;";
	});

	returnButton.addEventListener("click", () => {
		deleteModal.style = "display: flex;";
		addModal.style = "display: none;";
	});
}
