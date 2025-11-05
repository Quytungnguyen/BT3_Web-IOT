async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const hashed = await sha256(password);

  const res = await fetch('http://quytung.com:8088/nodered/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password: hashed })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem('user', username);
    document.getElementById('user').textContent = username;
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadSensorData();
  } else {
    document.getElementById('login-msg').innerText = 'Sai tài khoản hoặc mật khẩu!';
  }
}

async function loadSensorData() {
  const res = await fetch('http://quytung.com:8088/nodered/sensor/latest');
  const data = await res.json();
  document.getElementById('sensor-data').innerText =
    `Nhiệt độ: ${data.temp} °C | Độ ẩm: ${data.hum}% | Ánh sáng: ${data.light} lux`;
}

function logout() {
  localStorage.clear();
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('login-section').classList.remove('hidden');
}

window.onload = () => {
  const user = localStorage.getItem('user');
  if (user) {
    document.getElementById('user').textContent = user;
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    loadSensorData();
  }
  document.getElementById('login-btn').onclick = login;
  document.getElementById('logout-btn').onclick = logout;
};
