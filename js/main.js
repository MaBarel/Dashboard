let accounts = [
    {
        email: "koenvandenaakster@gmail.com",
        username: "Oranos",
        password: "koen",
    },
    {
        email: "admin@gmail.com",
        username: "admin",
        password: "admin",
    }
]
if (localStorage.getItem("accounts") != null) {
    accounts = JSON.parse(localStorage.getItem("accounts"))
}
console.log(accounts)