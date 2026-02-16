const userServerUrl = "http://localhost:8001";
async function register() {
    const emailValue = document.getElementById("regEmail").value;
    const passwordValue = document.getElementById("regPass").value;
    const response = await fetch(userServerUrl + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            email: emailValue, 
            password: passwordValue 
        })
    });
    const data = await response.json();
    document.getElementById("statusMessage").innerText = data.message;
}
async function login() {
    const emailValue = document.getElementById("loginEmail").value;
    const passwordValue = document.getElementById("loginPass").value;
    const response = await fetch(userServerUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            email: emailValue, 
            password: passwordValue 
        })
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById("statusMessage").innerText = data.message + " и ваша роль: " + data.user.role;
    } else {
        document.getElementById("statusMessage").innerText = data.message;
    }
}