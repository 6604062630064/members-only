regisForm = document.querySelector("form.regis-form");
password = document.getElementById("password");
cpasword = document.getElementById("cpassword");
warningBox = document.querySelector("span.warning");

regisForm.addEventListener("submit", (e) => {
	console.log("test");
	if (cpassword.value !== password.value) {
		warningBox.textContent = "Passwords do not match.";
		e.preventDefault();
	}
});
