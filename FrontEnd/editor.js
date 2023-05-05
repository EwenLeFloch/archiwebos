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
	const closeButton = document.querySelector("#cancel");

	closeButton.addEventListener("click", () => {
		dialog.close();
		dialog.style = "display: none;";
	});
}
