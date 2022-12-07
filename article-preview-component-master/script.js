const shareButton = document.querySelector("#share");
const shareSectionMobile = document.querySelector("#share-mobile");
const shareSectionDesktop = document.querySelector("#share-desktop");
shareButton.addEventListener("click", () => {
	if (window.innerWidth <= 700) {
		shareSectionMobile.classList.toggle("active");
	} else {
		shareSectionDesktop.classList.toggle("active");
	}
	shareButton.classList.toggle("dark");
});
