//consts
const usernameInput = document.querySelector(".username");
const passwordInput = document.querySelector(".password");
const loginButton = document.querySelector(".button");
const loginWrong = document.querySelector(".login-wrong");

let username;
let password;

loginButton.addEventListener("click", loginChecker);

function loginChecker() {
    console.log("clicked");
    username = usernameInput.value;
    password = passwordInput.value;
    console.log(username, password)
    for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i])
        if (username == accounts[i].username && password == accounts[i].password) {
            window.location.href = "/home.html"
        }
        else {
            loginWrong.classList.add("visible");
            loginWrong.classList.remove("invisible");
            setTimeout(() => {
                loginWrong.classList.add("invisible");
                loginWrong.classList.remove("visible");
            }, 3000);
        }
    }
}

