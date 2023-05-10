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
	const modal = document.querySelector("#modal");

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
	const token = localStorage.getItem("token");
	const deleteModal = document.querySelector(".delete-modal");
	const addModal = document.querySelector(".add-modal");
	const addWork = document.querySelector("#addWork");
	const returnButton = document.querySelector("#back");

	const fileInput = document.querySelector("#files");
	const previewImage = document.querySelector("#preview-image");

	fileInput.addEventListener("change", () => {
		const file = fileInput.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			previewImage.src = reader.result;
		});

		previewImage.style = "display: block";
		document.querySelector(".files-input__container").style =
			"display: none;";
		if (file) {
			reader.readAsDataURL(file);
		}
	});

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

	//Permet de poster un nouveau travail
	const formAjout = document.querySelector("#form-ajout");
	const validateButton = document.querySelector("#submit-button");

	formAjout.addEventListener("input", function () {
		let inputs = formAjout.querySelectorAll(".add-input");
		let isFormvalid = true;

		for (let i = 0; i < inputs.length; i++) {
			if (!inputs[i].value) {
				isFormvalid = false;
				break;
			}
		}

		if (isFormvalid) {
			validateButton.style.background = "#1d6154";
		}
	});
	formAjout.addEventListener("submit", async (e) => {
		e.preventDefault();
		const imageUrl = fileInput.files[0];
		const title = document.querySelector("#title").value;
		const category = parseInt(document.querySelector("#category").value);

		const formData = new FormData();
		formData.append("image", imageUrl);
		formData.append("title", title);
		formData.append("category", category);
		try {
			const response = await fetch("http://localhost:5678/api/works", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});
			if (response.ok) {
			} else {
				console.error("Erreur lors de l'envoi des donnees");
			}
		} catch (error) {
			console.error(error);
		}
	});
}
