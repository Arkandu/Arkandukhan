let loginCount = 0;
let users = [];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "arkandu.khan" && pass === "Arkandu@1998") {
    alert("Admin Login Success");
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "block");
  } else {
    alert("User Login Success");
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");
  }

  document.getElementById("loginPage").style.display = "none";
  openWindow("homeWindow");
  loginCount++;
  document.getElementById("loginCount").textContent = loginCount;

  users.push({ name: user, email: user + "@example.com" });
  updateUserList();
});

function openWindow(id) {
  document.querySelectorAll(".window").forEach(w => w.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function updateUserList() {
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.name} (${u.email})`;
    list.appendChild(li);
  });
}

// Profile settings
document.getElementById("nameInput").addEventListener("input", e => {
  document.getElementById("profileName").textContent = e.target.value || "User";
});
document.getElementById("emailInput").addEventListener("input", e => {
  document.getElementById("profileEmail").textContent = e.target.value || "user@example.com";
});
document.getElementById("profilePicUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById("profilePic").src = reader.result;
    reader.readAsDataURL(file);
  }
});

// Background change
document.getElementById("bgUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById("background").style.backgroundImage = `url(${reader.result})`;
    reader.readAsDataURL(file);
  }
});
function resetBackground() {
  document.getElementById("background").style.backgroundImage = "url('https://picsum.photos/1920/1080?blur=5')";
}

// Documents
document.getElementById("docUpload").addEventListener("change", e => {
  const list = document.getElementById("docList");
  for (let file of e.target.files) {
    const li = document.createElement("li");
    li.textContent = `${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    list.appendChild(li);
  }
});

// Photos
document.getElementById("photoUpload").addEventListener("change", e => {
  const gallery = document.getElementById("photoGallery");
  for (let file of e.target.files) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});
