const serverUrl = "http://localhost:8002"; 
async function loadAllDocuments() { 
    const response = await fetch(serverUrl + "/get-documents");
    const documents = await response.json();
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = documents.map(function(item) {
        return `
            <div>
                <b>ID:</b> ${item._id}<br>
                <b>Заголовок:</b> ${item.title}<br>
                <b>Текст:</b> ${item.content}
            </div>
        `;
    }).join('');
}
async function sendPostRequest(path, data) {  
    await fetch(serverUrl + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    loadAllDocuments();
}
async function createNewDocument() { 
    const titleInput = document.getElementById("createTitle");
    const contentInput = document.getElementById("createContent");
    await sendPostRequest("/create-document", {
        title: titleInput.value,
        content: contentInput.value
    });
    titleInput.value = "";
    contentInput.value = "";
}
async function updateDocumentContent() {
    const documentIdInput = document.getElementById("editId");
    const contentInput = document.getElementById("editContent");
    await sendPostRequest("/update-document", {
        id: documentIdInput.value,
        content: contentInput.value
    });
    documentIdInput.value = "";
    contentInput.value = "";
}

loadAllDocuments();