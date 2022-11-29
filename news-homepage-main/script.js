const hamburger = document.querySelector(".hamburger");
const open = document.querySelector(".open");
const close = document.querySelector(".close");
const sidemenu = document.querySelector('#sidemenu');

hamburger.addEventListener("click", () => {
	if (hamburger.classList.contains("active")) {
		hamburger.classList.remove("active");
		open.style.display = "none";
		close.style.display = "block";
        sidemenu.classList.add('active');
	} else {
		hamburger.classList.add("active");
        open.style.display = "block";
		close.style.display = "none";
        sidemenu.classList.remove('active');
	}
});
