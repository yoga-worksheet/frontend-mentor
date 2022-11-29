const API_ENDPOINT = "https://api.adviceslip.com/advice";
const adviceIdField = document.querySelector("#advice__id");
const adviceField = document.querySelector("#advice");
const randomButton = document.querySelector("button");

const fetchRandomAdvice = async () => {
	const response = await fetch(API_ENDPOINT, { cache: "no-cache" });
	const result = await response.json();
	return result;
};

const getRandomAdvice = () => {
	fetchRandomAdvice().then((result) => {
		console.log(result);
		adviceIdField.innerText = result.slip.id;
		adviceField.innerText = `"${result.slip.advice}"`;
	});
};

window.addEventListener("load", () => getRandomAdvice());

randomButton.addEventListener("click", () => getRandomAdvice());
