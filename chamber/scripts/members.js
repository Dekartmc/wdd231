const currentYear = new Date().getFullYear();
document.getElementById("copyright").textContent = `© ${currentYear} | Michael Flores | Utah`;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

const membersContainer = document.getElementById('members');
const toggleBtn = document.getElementById('viewToggle');
let isGrid = true;

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    membersContainer.innerHTML = '<p>Failed to load members.</p>';
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(m => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name}">
      <div class="member-info">
        <h3>${m.name}</h3>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><a href="${m.website}" target="_blank">Visit Website</a></p>
        <p><strong>Membership:</strong> ${mapMembership(m.membershipLevel)}</p>
      </div>
    `;
    membersContainer.appendChild(card);
  });
  updateView();
}

function mapMembership(level) {
  switch (level) {
    case 3:
      return 'Gold';
    case 2:
      return 'Silver';
    case 1:
    default:
      return 'Member';
  }
}

function updateView() {
  if (isGrid) {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
    toggleBtn.textContent = 'Switch to List View';
  } else {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
    toggleBtn.textContent = 'Switch to Grid View';
  }
}

toggleBtn.addEventListener('click', () => {
  isGrid = !isGrid;
  updateView();
});

// Footer dynamic content
function setFooterDates() {
  const lastModSpan = document.getElementById('lastModified');
  const yearSpan = document.getElementById('currentYear');
  lastModSpan.textContent = document.lastModified;
  yearSpan.textContent = new Date().getFullYear();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchMembers();
  setFooterDates();
});