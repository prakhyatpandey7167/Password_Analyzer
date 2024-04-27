document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const result = passwordStrength(password);
    const resultElement = document.getElementById("result");
    if (typeof result === "string") {
        resultElement.innerHTML = result;
        resultElement.style.color = "green";
    } else {
        let weaknessesHTML = "<ul>";
        result.forEach(weakness => {
            weaknessesHTML += "<li>" + weakness + "</li>";
        });
        weaknessesHTML += "</ul>";
        resultElement.innerHTML = "Weaknesses Detected in the Password:<br>" + weaknessesHTML;
        resultElement.style.color = "red";
    }
});

function passwordStrength(password) {
    const weaknesses = [];
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[^a-zA-Z0-9]/;

    if (!digitRegex.test(password)) {
        weaknesses.push("Password should contain at least one digit.");
    }
    if (!lowercaseRegex.test(password)) {
        weaknesses.push("Password should contain at least one Lower Case letter.");
    }
    if (!uppercaseRegex.test(password)) {
        weaknesses.push("Password should contain at least one Upper Case letter.");
    }
    if (!specialCharRegex.test(password)) {
        weaknesses.push("Password should contain at least one Special Character/Symbol.");
    }
    if (password.length < 8) {
        weaknesses.push("Password is too short. It should be at least 8 characters long.");
    }

    if (weaknesses.length === 0) {
        return "You are Good to go,Password is Resilient.....!!";
    } else {
        return weaknesses;
    }
}
