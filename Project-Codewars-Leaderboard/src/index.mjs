import { parseUsernames } from "./utility.mjs";
import { fetchUser, fetchAllUsers } from "./api.mjs";
import { getLeaderboardData, getLanguages } from "./leaderboard.mjs";

export function makeFetchRequest() {
  return fetch("https://example.com/test");
}
let users = [];

if (typeof document !== "undefined") {
    const form = document.querySelector("#user-form");
    const input = document.querySelector("#user-input");
    const tableBody = document.querySelector("#leaderboard-body");
    const errorMessage = document.querySelector("#error-message");
    const languageSelect = document.querySelector("#language-select");

    form.addEventListener("submit", async(event) => {
        event.preventDefault();

        errorMessage.textContent = "";
        tableBody.innerHTML = "";

        const inputValue = input.value;
        const usernames = parseUsernames(inputValue);

        if(usernames.length === 0) {
            errorMessage.textContent = "Please enter at least one username.";
            return;
        }

        try {
            users = await fetchAllUsers(usernames);

            const languages = getLanguages(users);
            languageSelect.innerHTML = "";
            languages.forEach((language) => {
                const option = document.createElement("option");
                option.value = language;
                option.textContent = language;
                languageSelect.appendChild(option);
            });

            const leaderboard = getLeaderboardData(users, "overall");
            renderTable(leaderboard);
        } catch(error) {
            errorMessage.textContent = error.message;
        }
    });

    languageSelect.addEventListener("change", () => {
        const selectedLanguage = languageSelect.value;
        const leaderboard = getLeaderboardData(users, selectedLanguage);
        renderTable(leaderboard);
    });

    function renderTable(data) {
        tableBody.innerHTML = "";

        data.forEach((user) => {
            const row = document.createElement("tr");

            const usernameCell = document.createElement("td");
            usernameCell.textContent = user.username;

            const clanCell = document.createElement("td");
            clanCell.textContent = user.clan || "";

            const scoreCell = document.createElement("td");
            scoreCell.textContent = user.score;

            row.appendChild(usernameCell);
            row.appendChild(clanCell);
            row.appendChild(scoreCell);

            tableBody.appendChild(row);
        });
    }
}