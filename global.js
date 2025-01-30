console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");
// let currentLink = navLinks.find(
// (a) => a.host === location.host && a.pathname === location.pathname
// );
// currentLink?.classList.add('current');

let pages = [
  { url: '', title: 'Home' },
  { url: 'contact/', title: 'Contact' },
  { url: 'projects/', title: 'Projects' },
  { url: "https://github.com/ZiyaoZzz", title: 'GitHub' },
  { url: 'resume/', title: 'Resume' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (const p of pages) {
  let url = p.url;

  if (!ARE_WE_HOME && !url.startsWith('http')) {
      url = `../${url}`;
  }

  const a = document.createElement('a');
  a.href = url;
  a.textContent = p.title;

  if (a.host === location.host && a.pathname === location.pathname) {
      a.classList.add('current');
  }

  if (a.host !== location.host) {
      a.target = '_blank';
  }

  nav.append(a);
}

/*lab 3 step 4*/
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

let colorSchemeSelect = document.querySelector('.color-scheme select');

if ('colorScheme' in localStorage) {
  document.documentElement.style.setProperty('color-scheme', localStorage.colorScheme);
  colorSchemeSelect.value = localStorage.colorScheme;
}

colorSchemeSelect.addEventListener('change', (event) => {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value; 
});

/*lab 4*/
export async function fetchJSON(url) {
  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();
      return data; 

  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
      return null;
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
      console.error("Invalid container element provided.");
      return;
  }

  if (!Array.isArray(projects) || projects.length === 0) {
      console.warn("No projects available to render.");
      return;
  }

  containerElement.innerHTML = '';

  projects.forEach(project => {
      const article = document.createElement('article');

      const title = project.title ? project.title : "Untitled Project";
      const image = project.image ? project.image : "placeholder.png";
      const description = project.description ? project.description : "No description available.";

      const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      const safeHeading = validHeadingLevels.includes(headingLevel) ? headingLevel : 'h2';

      article.innerHTML = `
          <${safeHeading}>${title}</${safeHeading}>
          <img src="${image}" alt="${title}">
          <p>${description}</p>
      `;

      containerElement.appendChild(article);
  });
}


export async function fetchGitHubData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json(); 
  return data; 
}
