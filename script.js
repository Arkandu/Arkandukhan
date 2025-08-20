let loginCounter = 0;
let fileCounter = 0;
let currentUser = { username: "", email: "" };
let users = [];

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if ((user === "arkandu.khan" && pass === "Arkandu@1998") || (user && pass)) {
    loginCounter++;
    document.getElementById("loginCount").innerText = loginCounter;

    currentUser.username = user;
    currentUser.email = user + "@mail.com";

    document.getElementById("profileName").innerText = currentUser.username;
    document.getElementById("profileEmail").innerText = currentUser.email;

    if (user === "arkandu.khan") {
      document.querySelector(".admin-only").style.display = "block";
    }

    users.push({ name: user, email: currentUser.email });
    renderUsers();

    document.getElementById("loginScreen").style.display = "none";
    openWindow("homeWindow");
  } else {
    alert("Invalid login");
  }
}

// Open window
function openWindow(id) {
  document.querySelectorAll(".window").forEach(win => win.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// Save settings
function saveSettings() {
  currentUser.username = document.getElementById("settingsName").value || currentUser.username;
  currentUser.email = document.getElementById("settingsEmail").value || currentUser.email;

  document.getElementById("profileName").innerText = currentUser.username;
  document.getElementById("profileEmail").innerText = currentUser.email;
  alert("Profile updated!");
}

// Handle file uploads
function handleFileUpload(event, type) {
  const files = event.target.files;
  for (let file of files) {
    fileCounter++;
    document.getElementById("fileCount").innerText = fileCounter;

    if (type === "doc") {
      const li = document.createElement("li");
      li.className = "file-item";
      li.innerHTML = `<div class="file-name" ondblclick="renameFile(this)">${file.name}</div>`;
      addContextMenu(li);
      document.getElementById("docList").appendChild(li);
    } else if (type === "photo") {
      const div = document.createElement("div");
      div.className = "file-item";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      const caption = document.createElement("div");
      caption.className = "file-name";
      caption.innerText = file.name;
      caption.ondblclick = () => renameFile(caption);
      div.appendChild(img);
      div.appendChild(caption);
      addContextMenu(div);
      document.getElementById("photoGallery").appendChild(div);
    }
  }
}

// Rename file inline
function renameFile(el) {
  el.contentEditable = "true";
  el.focus();
  el.onblur = () => { el.contentEditable = "false"; };
}

// Context Menu
function addContextMenu(element) {
  element.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    const menu = document.getElementById("contextMenu");
    menu.innerHTML = `
      <div onclick="alert('Open ${element.innerText}')">Open</div>
      <div onclick="renameFile(element.querySelector('.file-name'))">Rename</div>
      <div onclick="element.remove()">Delete</div>
    `;
    menu.style.top = e.pageY + "px";
    menu.style.left = e.pageX + "px";
    menu.style.display = "block";
  });
}

document.addEventListener("click", () => {
  document.getElementById("contextMenu").style.display = "none";
});

// Render user list (admin)
function renderUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.innerText = `${u.name} (${u.email})`;
    list.appendChild(li);
  });
}
