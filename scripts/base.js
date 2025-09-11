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

const courses = [
  { id: 1, type: "CSE", code: "CSE 111", name: "Programming with Functions", credits: 2 },
  { id: 2, type: "CSE", code: "CSE 210", name: "Programming with Classes Current Retake", credits: 2 },
  { id: 3, type: "CSE", code: "CSE 110", name: "Introduction to Programming", credits: 2 },
  { id: 4, type: "WDD", code: "WDD 130", name: "Web Fundamentals", credits: 2 },
  { id: 5, type: "WDD", code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2 }
];

function displayCourses(filteredCourses) {
  const container = document.getElementById("course-card");
  container.innerHTML = "";

  filteredCourses.forEach(courses => {
    const card = document.createElement("div");
    card.classList.add("course-card");

    card.innerHTML = `
      <div>
        <h2>${courses.code}</h2>
        <p><strong>Course:</strong> ${courses.name}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

function sumCredits(filterType) {
  const filtered = filterType 
    ? courses.filter(course => course.type === filterType)
    : courses;

  const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);

  document.getElementById("total-credits").textContent = 
    filterType 
      ? `${filterType} Total Credits: ${totalCredits}`
      : `Overall Total Credits: ${totalCredits}`;
}

document.getElementById("all").addEventListener("click", () => {
  displayCourses(courses);
  sumCredits()
});

document.getElementById("cse").addEventListener("click", () => {
  displayCourses(courses.filter(t => t.type == "CSE"));
  sumCredits('CSE')
});

document.getElementById("wdd").addEventListener("click", () => {
  displayCourses(courses.filter(t => t.type == "WDD"));
  sumCredits('WDD')
});

displayCourses(courses);
sumCredits();