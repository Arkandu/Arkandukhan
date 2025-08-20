let loginCounter = 0;
let users = [
  { username: "arkandu.khan", password: "Arkandu@1998", role: "Admin" }
];
let currentUser = null;

function login() {
  const user = document.getElementById("loginUsername").value;
  const pass = document.getElementById("loginPassword").value;

  const found = users.find(u => u.username === user && u.password === pass);
  if (found) {
    currentUser = found;
    loginCounter++;
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("appContainer").style.display = "block";
    document.getElementById("loginCount").innerText = loginCounter;
    document.getElementById("profileName").innerText = found.username;
    document.getElementById("profileEmail").innerText = "example@mail.com";
    document.getElementById("profileRole").innerText = found.role;

    if (found.role !== "Admin") {
      document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");
    }
  } else {
    alert("Invalid credentials!");
  }
}

function logout() {
  document.getElementById("appContainer").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  currentUser = null;
}

function openWindow(name) {
  document.querySelectorAll(".window").forEach(w => w.style.display = "none");
  document.getElementById(name + "Window").style.display = "block";
}

/* Save Settings */
function saveSettings() {
  const name = document.getElementById("settingName").value;
  const email = document.getElementById("settingEmail").value;
  if (name) document.getElementById("profileName").innerText = name;
  if (email) document.getElementById("profileEmail").innerText = email;
  alert("Settings updated!");
}

/* File Uploads */
document.getElementById("docUpload").addEventListener("change", function(e) {
  const list = document.getElementById("docList");
  list.innerHTML = "";
  Array.from(e.target.files).forEach(file => {
    const div = document.createElement("div");
    div.innerText = `${file.name} (${Math.round(file.size/1024)} KB)`;
    list.appendChild(div);
  });
});

document.getElementById("photoUpload").addEventListener("change", function(e) {
  const list = document.getElementById("photoList");
  list.innerHTML = "";
  Array.from(e.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(ev) {
      const img = document.createElement("img");
      img.src = ev.target.result;
      list.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});
