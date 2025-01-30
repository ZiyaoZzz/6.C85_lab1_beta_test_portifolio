import { fetchJSON, renderProjects, fetchGitHubData } from '../global.js';

async function loadLatestProjects() {
    try {
        const projects = await fetchJSON('../lib/projects.json');
        const latestProjects = projects.slice(0, 3);
        const projectsContainer = document.querySelector('.projects');
        if (!projectsContainer) {
            console.error("Projects container not found.");
            return;
        }

        renderProjects(latestProjects, projectsContainer, 'h2');
    } catch (error) {
        console.error("Error loading latest projects:", error);
    }
}

async function loadGitHubProfile() {
    try {
        const githubData = await fetchGitHubData('ZiyaoZzz');
        const profileStats = document.querySelector('#profile-stats');
        if (profileStats) {
            profileStats.innerHTML = `
                <dl>
                    <dt>Public Repos</dt><dd>${githubData.public_repos}</dd>
                    <dt>Public Gists</dt><dd>${githubData.public_gists}</dd>
                    <dt>Followers</dt><dd>${githubData.followers}</dd>
                    <dt>Following</dt><dd>${githubData.following}</dd>
                </dl>
            `;
        }
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}
loadLatestProjects();
loadGitHubProfile();
