const ratings = document.querySelectorAll(".rating__item");
let rate = 0;

ratings.forEach((rating, index) => {
	rating.addEventListener("click", () => {
		if (rate) ratings[rate - 1].classList.remove("active");
		rating.classList.add("active");
		rate = index + 1;
	});
});

const button = document.querySelector(".button");
const rateCard = document.querySelector("#rate");
const resultCard = document.querySelector("#result");
const rateField = document.querySelector("#rate_result");

button.addEventListener("click", () => {
	if (!rate) return 0;
	rateCard.classList.add("hide");
	resultCard.classList.remove("hide");
	rateField.innerHTML = rate;
});
