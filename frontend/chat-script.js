const gatewayUrl = "http://localhost:8000";
async function publishMessage() {
    const name = document.getElementById("userNameInput").value;
    const text = document.getElementById("userMessageInput").value;
    await fetch(gatewayUrl + "/chat-a/publish-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, userMessage: text })
    });
    document.getElementById("userMessageInput").value = "";
}
async function updateHistory() {
    const response = await fetch(gatewayUrl + "/chat-b/get-history");
    const data = await response.json();
    const list = document.getElementById("messagesList");
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const messageDiv = document.createElement("div");
        messageDiv.innerText = data[i];
        list.appendChild(messageDiv);
    }
}
setInterval(updateHistory, 3000);   