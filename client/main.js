const form = document.getElementById("message-form");
const messageList = document.getElementById("message-list");

const baseURL = import.meta.env.VITE_Server;

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);

  const response = await fetch(`${baseURL}/board`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  if (response.ok) {
    displayMessages();
    form.reset();
  } else {
    console.error("Failed to post message", response.status);
  }
});

async function fetchMessages() {
  const messages = await fetch(`${baseURL}/board`);
  let result = await messages.json();
  return result;
}

async function displayMessages() {
  let messages = await fetchMessages();

  messageList.innerHTML = "";
  messages.forEach((message) => {
    let messageDiv = document.createElement("div");
    messageDiv.setAttribute("class", "message-div");

    let h3Tag = document.createElement("h3");
    let pTag = document.createElement("p");
    let delButton = document.createElement("div");
    let likeButton = document.createElement("div");
    let likeCount = document.createElement("p");
    let buttonDiv = document.createElement(`div`);
    buttonDiv.setAttribute("class", "button-div");

    h3Tag.textContent = message.username;
    pTag.textContent = message.message;
    likeCount.textContent = `Likes: ${message.likes}`;
    h3Tag.setAttribute("class", "username");
    pTag.setAttribute("class", "username-message");
    delButton.setAttribute("class", "del-button");
    likeButton.setAttribute("class", "like-button");
    likeCount.setAttribute("class", "like-count");

    // del button
    delButton.addEventListener("click", (event) => {
      event.preventDefault();
      handleDelete(message.id);
    });

    likeButton.addEventListener("click", async (event) => {
      event.preventDefault();
      await handleLike(message.id);
      displayMessages();
    });

    messageList.appendChild(messageDiv);
    messageDiv.appendChild(h3Tag);
    messageDiv.appendChild(pTag);
    messageDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(likeCount);
    buttonDiv.appendChild(likeButton);
    buttonDiv.appendChild(delButton);
  });
}

displayMessages();

async function handleDelete(id) {
  const result = await fetch(`${baseURL}/board/${id}`, {
    method: "DELETE",
  });
  console.log(result);
  if (result.ok) {
    displayMessages();
  }
}

async function handleLike(id) {
  const result = await fetch(`${baseURL}/board/like/${id}`, {
    method: "PUT",
  });
  if (result.ok) {
    displayMessages();
  }
}

// some extras!

const logo = document.getElementById("logoBox");
const meaning = document.getElementById("meaning");

logo.addEventListener("mouseover", function () {
  meaning.textContent = 'in Esperanto means "To speak"';
  meaning.style.display = "block";
});

logo.addEventListener("mouseout", function () {
  meaning.style.display = "none";
});
