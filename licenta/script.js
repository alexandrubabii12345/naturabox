// boxesData trebuie să fie global
const boxesData = [
    { title: 'SLIMBOX', subtitle: '2 mese & 1 gustare/zi', kcal: ['1000', '1400', '1800'], image: 'img/lightbox.png' },
    { title: 'EASYBOX', subtitle: '3 mese & 1 gustare/zi', kcal: ['1400', '1800', '2200'], image: 'img/logicbox.png' },
    { title: 'GREENBOX', subtitle: '3 mese & 1 gustare/zi', kcal: ['1400', '1800', '2200'], image: 'img/veganbox.png' },
    { title: 'VEGGIEBOX', subtitle: '3 mese & snack', kcal: ['1500'], image: 'img/veggiebox.jpg' },
    { title: 'MUSCLEBOX', subtitle: '4 mese', kcal: ['2600'], image: 'img/sportbox.jpg' }
  ];
  

function generateBox(data) {
    const kcalHtml = data.kcal.map(k => `<div class="kcal">${k} kcal</div>`).join('');
    return `
      <a href="${data.title.toLowerCase()}.html" style="text-decoration: none; color: inherit;">
        <div class="box">
          <img src="${data.image}" alt="${data.title}">
          <div class="box-title mt-3">${data.title}</div>
          <div>${data.subtitle}</div>
          <div class="kcal-buttons mt-2">${kcalHtml}</div>
        </div>
      </a>
    `;
  }
  

let currentIndex = 0;
const visibleBoxes = 3;

function renderCarousel() {
  carousel.innerHTML = '';
  for (let i = 0; i < visibleBoxes; i++) {
    const data = boxesData[(currentIndex + i) % boxesData.length];
    carousel.innerHTML += generateBox(data);
  }
}

function moveSlide(direction) {
  currentIndex = (currentIndex + direction + boxesData.length) % boxesData.length;
  renderCarousel();
}

renderCarousel();


  function toggleChatbot() {
    const box = document.getElementById("chatbot-box");
    box.classList.toggle("d-none");
    box.classList.toggle("animate__fadeInUp");
  }

  async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) return;

    const chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML += `<div class="user"><strong>Tu:</strong> ${message}</div>`;
    input.value = "";

    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    chatWindow.innerHTML += `<div class="bot"><strong>AI:</strong> ${data.response}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

