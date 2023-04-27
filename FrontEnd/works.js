const gallery = document.querySelector(".gallery");

try {
	const response = await fetch("http://localhost:5678/api/works");
	const works = await response.json();

	const response2 = await fetch("http://localhost:5678/api/categories");
	const categories = await response2.json();

	displayWorks(works);
	displayCategories(categories);
} catch (error) {
	console.log(error);
}

//To display works into the gallery
function displayWorks(works) {
	for (let i = 0; i < works.length; i++) {
		const work = works[i];
		const workElement = document.createElement("figure");
		gallery.appendChild(workElement);

		// Image
		const imageElement = document.createElement("img");
		imageElement.src = work.imageUrl;
		workElement.appendChild(imageElement);

		//Title
		const titleElement = document.createElement("figcaption");
		titleElement.innerText = work.title;
		workElement.appendChild(titleElement);
	}
}

//To display categories Button
function displayCategories(categories) {
	const filterBar = document.querySelector(".filterBar");

	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		const filterElement = document.createElement("button");
		filterElement.innerText = category.name;
		filterBar.appendChild(filterElement);
	}
}
