const emailInput = document.querySelector(".email");
const usernameInput = document.querySelector(".username");
const passwordOneInput = document.querySelector(".password-one");
const passwordTwoInput = document.querySelector(".password-two");
const registerButton = document.querySelector(".button");
const usernameTaken = document.querySelector(".username-taken");
const passwordsDontMatch = document.querySelector(".passwords-dont-match");
const inputFields = document.querySelector(".fields");

let email;
let username;
let passwordOne;
let passwordTwo;
let usernameCheck = false;
let passwordsCheck = false;
let everythingFilledIn = false;

registerButton.addEventListener("click", infoChecker)

function infoChecker() {
    email = emailInput.value;
    username = usernameInput.value;
    passwordOne = passwordOneInput.value;
    passwordTwo = passwordTwoInput.value;
    for (let i = 0; i < accounts.length; i++) {
        if (username == accounts[i].username) {
            usernameCheck = false
            somethingWentWrong(usernameTaken);
        }
        else {
            usernameCheck = true
        }
    }
    if (passwordOne !== passwordTwo) {
        somethingWentWrong(passwordsDontMatch);
    }
    else (
        passwordsCheck = true
    )
    if (email == "" || username == "" || passwordOne == "" || passwordTwo == "") {
        somethingWentWrong(inputFields);
    }
    else {
        everythingFilledIn = true;
    }
    if (usernameCheck == true && passwordsCheck == true && everythingFilledIn == true) {
        createAccount();
    }
}

function somethingWentWrong(x) {
    x.classList.add("visible");
    x.classList.remove("invisible");
    setTimeout(() => {
        x.classList.add("invisible");
        x.classList.remove("visible");
    }, 3000);
}

function createAccount() {
    console.log(email, username, passwordOne, passwordTwo)
    accounts.push({
        email: email,
        username: username,
        password: passwordOne,
    }
    )
    localStorage.setItem("accounts", JSON.stringify(accounts));
    window.location.href = "/index.html"
}