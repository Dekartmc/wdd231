async function loadDiscoverData() {
  const response = await fetch('data/discover.json');
  const data = await response.json();
  const grid = document.querySelector('.card-grid');

  data.places.forEach(place => {
    const card = document.createElement('section');
    card.classList.add('place-card');
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure><img src="images/${place.image}" alt="${place.name}"></figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button>Learn More</button>
    `;
    grid.appendChild(card);
  });
}
loadDiscoverData();

function showVisitMessage() {
  const message = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    message.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysBetween < 1) {
      message.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message.textContent = "You last visited 1 day ago.";
    } else {
      message.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}
showVisitMessage();
