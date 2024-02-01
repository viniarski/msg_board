const form = document.getElementById("message-form");
const messageList = document.getElementById("message-list");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);

  const response = await fetch("http://localhost:4000/board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  if (response.ok) {
    displayMessages();
  } else {
    console.error("Failed to post message", response.status);
  }
});

async function fetchMessages() {
  const messages = await fetch("http://localhost:4000/board");
  let result = await messages.json();
  return result;
}

async function displayMessages() {
  let messages = await fetchMessages();

  messageList.innerHTML = "";
  messages.forEach((message) => {
    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    // let delButton = document.createElement('button')
    // let likeButton = document.createElement('button')

    h3Tag.textContent = message.username;
    pTag.textContent = message.message;

    messageList.appendChild(h3Tag);
    messageList.appendChild(pTag);
  });
}

displayMessages();
