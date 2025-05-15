const menuSelect = document.getElementById('menu-select');
const kcalSelect = document.getElementById('calories-select');
const personsInput = document.getElementById('persons');
const daysInput = document.getElementById('days');
const costBox = document.getElementById('cost-box');

const menuPrices = {
  SLIMBOX: 30,
  EASYBOX: 35,
  GREENBOX: 38,
  VEGGIEBOX: 34,
  MUSCLEBOX: 42
};

// Populează opțiunile de meniu
boxesData.forEach(box => {
  const option = document.createElement('option');
  option.value = box.title;
  option.textContent = `${box.title} - ${box.subtitle} (${menuPrices[box.title]} lei/zi)`;
  menuSelect.appendChild(option);
});

// La schimbarea meniului
menuSelect.addEventListener('change', () => {
  kcalSelect.innerHTML = '<option value="">Alege o opțiune</option>';
  const selectedBox = boxesData.find(b => b.title === menuSelect.value);
  if (selectedBox) {
    kcalSelect.disabled = false;
    selectedBox.kcal.forEach(k => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = `${k} kcal`;
      kcalSelect.appendChild(opt);
    });
  } else {
    kcalSelect.disabled = true;
  }
  updateCost();
});

function calcDiscount(days) {
  if (days >= 30) return 0.85;
  if (days >= 15) return 0.90;
  if (days >= 10) return 0.95;
  return 1;
}

function updateCost() {
  const persons = parseInt(personsInput.value) || 1;
  const days = parseInt(daysInput.value) || 1;
  const menu = menuSelect.value;
  const discount = calcDiscount(days);
  const pricePerDay = menuPrices[menu] || 0;
  const total = persons * days * pricePerDay * discount;
  if (costBox) costBox.textContent = `${Math.round(total)} lei`;
}

function handleOrder(event) {
  event.preventDefault();
  const menu = menuSelect.value;
  const kcal = kcalSelect.value;
  const persons = parseInt(personsInput.value) || 1;
  const days = parseInt(daysInput.value) || 1;
  const discount = calcDiscount(days);
  const pricePerDay = menuPrices[menu] || 0;
  const total = Math.round(persons * days * pricePerDay * discount);

  const queryParams = new URLSearchParams({
    menu,
    kcal,
    persons,
    days,
    total
  });

  window.location.href = `checkout.html?${queryParams.toString()}`;
}

personsInput.addEventListener('input', updateCost);
daysInput.addEventListener('input', updateCost);
kcalSelect.addEventListener('change', updateCost);

// leagă formularul
document.getElementById('order-form').addEventListener('submit', handleOrder);

updateCost();
