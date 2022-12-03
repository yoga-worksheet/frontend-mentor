const colorTheme = {
	first: {
		backgroundColor: "hsl(222, 26%, 31%)",
		toggleKeypadBackgroundColor: "hsl(223, 31%, 20%)",
		screen: "hsl(224, 36%, 15%)",
		ClearKey: "hsl(225, 21%, 49%)",
		ClearShadow: "hsl(224, 28%, 35%)",
		ClearHover: "hsl(225, 33%, 72%)",
		ResultKey: "hsl(6, 63%, 50%)",
		ResultShadow: "hsl(6, 70%, 34%)",
		ResultHover: "hsl(6, 62%, 58%)",
		NormalKey: "hsl(30, 25%, 89%)",
		NormalShadow: "hsl(28, 16%, 65%)",
		NormalHover: "hsl(0, 0%, 100%)",
		TextDark: "hsl(221, 14%, 31%)",
		TextWhite: "hsl(0, 0%, 100%)",
	},
	second: {
		backgroundColor: "hsl(0, 0%, 90%)",
		toggleKeypadBackgroundColor: "hsl(0, 5%, 81%)",
		screen: "hsl(0, 0%, 93%)",
		ClearKey: "hsl(185, 42%, 37%)",
		ClearShadow: "hsl(185, 58%, 25%)",
		ClearHover: "hsl(185, 42%, 57%)",
		ResultKey: "hsl(25, 98%, 40%)",
		ResultShadow: "hsl(25, 99%, 27%)",
		ResultHover: "hsl(25, 98%, 60%)",
		NormalKey: "hsl(45, 7%, 89%)",
		NormalShadow: "hsl(35, 11%, 61%)",
		NormalHover: "hsl(50, 7%, 99%)",
		TextDark: "hsl(60, 10%, 19%)",
		TextWhite: "hsl(0, 0%, 100%)",
	},
	third: {
		backgroundColor: "hsl(268, 75%, 9%)",
		toggleKeypadBackgroundColor: "hsl(268, 71%, 12%)",
		screen: "hsl(268, 71%, 12%)",
		ClearKey: "hsl(281, 89%, 26%)",
		ClearShadow: "hsl(285, 91%, 52%)",
		ClearHover: "hsl(281, 89%, 46%)",
		ResultKey: "hsl(176, 100%, 44%)",
		ResultShadow: "hsl(177, 92%, 70%)",
		ResultHover: "hsl(176, 100%, 64%)",
		NormalKey: "hsl(268, 47%, 21%)",
		NormalShadow: "hsl(290, 70%, 36%)",
		NormalHover: "hsl(268, 47%, 41%)",
		TextDark: "hsl(52, 100%, 62%)",
		TextWhite: "hsl(0, 0%, 100%)",
		TextResult: "hsl(198, 20%, 13%)",
	},
};

const switchButtons = document.querySelectorAll(".switcher span");
const container = document.querySelector(".container");
let currentTheme = parseInt(localStorage.getItem("theme")) || 1;

const switchThemeVar = (theme) => {
	const root = document.documentElement;
	root.style.setProperty("--backgroundColor", theme.backgroundColor);
	root.style.setProperty(
		"--toggleKeypadBackgroundColor",
		theme.toggleKeypadBackgroundColor
	);
	root.style.setProperty("--screen", theme.screen);
	root.style.setProperty("--ClearKey", theme.ClearKey);
	root.style.setProperty("--ClearShadow", theme.ClearShadow);
	root.style.setProperty("--ClearHover", theme.ClearHover);
	root.style.setProperty("--ResultKey", theme.ResultKey);
	root.style.setProperty("--ResultShadow", theme.ResultShadow);
	root.style.setProperty("--ResultHover", theme.ResultHover);
	root.style.setProperty("--NormalKey", theme.NormalKey);
	root.style.setProperty("--NormalShadow", theme.NormalShadow);
	root.style.setProperty("--NormalHover", theme.NormalHover);
	root.style.setProperty("--TextDark", theme.TextDark);
	root.style.setProperty("--TextWhite", theme.TextWhite);
};

const switchTheme = (theme) => {
	switch (theme) {
		case 1:
			container.classList.remove("theme");
			switchThemeVar(colorTheme.first);
			break;
		case 2:
			container.classList.add("theme");
			switchThemeVar(colorTheme.second);
			resultButton.style.color = colorTheme.second.TextWhite;
			break;
		case 3:
			switchThemeVar(colorTheme.third);
			container.classList.add("theme");
			resultButton.style.color = colorTheme.third.TextResult;
			break;
	}
};

switchButtons.forEach((button, index) => {
	button.addEventListener("click", () => {
		if (currentTheme !== index + 1) {
			switchButtons[currentTheme - 1].classList.remove("active");
			currentTheme = index + 1;
			localStorage.setItem("theme", currentTheme);
			switchTheme(currentTheme);
			button.classList.add("active");
		}
	});
});

const screen = document.querySelector(".screen span");

let firstNum = "";
let operator = "";
let secondNum = "";

const addToVariable = (value) => {
	if (!operator) {
		if (!firstNum || firstNum === "0") {
			firstNum = value;
		} else {
			firstNum += value;
		}
	} else {
		if (!secondNum || secondNum === "0") {
			secondNum = value;
		} else {
			secondNum += value;
		}
	}
	renderToScreen();
};

const renderToScreen = () => {
	screen.innerText = `${firstNum} ${operator} ${secondNum}`;
};

const deleteScreen = () => {
	if (screen.innerText === "0" || !firstNum) return 0;
	if (secondNum) {
		secondNum = secondNum.slice(0, -1);
	} else if (operator) {
		operator = "";
	} else if (firstNum) {
		firstNum = firstNum.slice(0, -1);
		if (!firstNum) {
			screen.innerText = 0;
			return 0;
		}
	}
	renderToScreen();
};

const reset = () => {
	firstNum = "";
	secondNum = "";
	operator = "";
	screen.innerText = "0";
};

window.addEventListener("load", () => {
	if (!localStorage.getItem("theme")) {
		if (window.matchMedia) {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", (event) => {
					currentTheme = event.matches ? 3 : 2;
				});
		}
	}
	screen.innerText = 0;
	switchButtons[currentTheme - 1].classList.add("active");
	switchTheme(currentTheme);
});

const numberButton = document.querySelectorAll(".number");
numberButton.forEach((button) => {
	button.addEventListener("click", (event) =>
		addToVariable(event.target.innerText)
	);
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => deleteScreen());

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => reset());

const pointButton = document.querySelector("#point");
pointButton.addEventListener("click", () => {
	const ifPointExist = (variable) => {
		return variable.split("").some((char) => char === ".");
	};
	if (secondNum) {
		if (ifPointExist(secondNum)) return 0;
		secondNum = secondNum && secondNum.concat(".");
	} else {
		if (operator || ifPointExist(firstNum)) return 0;
		if (firstNum) {
			firstNum += ".";
		} else {
			firstNum = "0.";
		}
	}
	renderToScreen();
});

const operatorButton = document.querySelectorAll(".operator");
operatorButton.forEach((button) => {
	button.addEventListener("click", (event) => {
		if (firstNum) {
			operator = event.target.innerText;
			renderToScreen();
		}
	});
});

const resultButton = document.querySelector("#result");
resultButton.addEventListener("click", () => {
	if (!firstNum || !operator || !secondNum) return 0;
	const first = parseFloat(firstNum);
	const second = parseFloat(secondNum);
	let result = 0.0;
	switch (operator) {
		case "+":
			result = first + second;
			break;
		case "-":
			result = first - second;
			break;
		case "/":
			result = first / second;
			break;
		case "x":
			result = first * second;
			break;
		default:
			return 0;
	}
	result = Math.round(result * Math.pow(10, 3)) / Math.pow(10, 3);
	firstNum = result.toString();
	operator = "";
	secondNum = "";
	renderToScreen();
});
