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

const ARE_WE_HOME = document.documentElement.classList.contains('home');

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = !ARE_WE_HOME && !p.url.startsWith('http') ? '../' + p.url : p.url;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = p.title;
  a.classList.toggle('current', a.host === location.host && a.pathname === location.pathname);
  if (a.host !== location.host) {
    a.target = "_blank"; // Set target="_blank" for external links
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