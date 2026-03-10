import { parseUsernames } from "./utility.mjs";
import { fetchAllUsers } from "./api.mjs";
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

    languageSelect.disabled = true;

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
            const result = await fetchAllUsers(usernames);

            users = result.validUsers;

            if (result.invalidUsers.length > 0) {
                errorMessage.textContent = `Users not found: ${result.invalidUsers.join(", ")}`;
            }

            if (users.length === 0) {
                languageSelect.innerHTML = "";
                languageSelect.disabled = true;
                return;
            }

            const languages = getLanguages(users);
            languageSelect.innerHTML = "";
            languages.forEach((language) => {
                const option = document.createElement("option");
                option.value = language;
                option.textContent = language;
                languageSelect.appendChild(option);
            });

            languageSelect.disabled = false;

            const leaderboard = getLeaderboardData(users, "overall");
            renderTable(leaderboard);
            input.value = "";
        } catch(error) {
            users = [];
            languageSelect.innerHTML = "";
            languageSelect.disabled = true;
            errorMessage.textContent = error.message;
        }
    });

    languageSelect.addEventListener("change", () => {
        if(users.length === 0) return

        errorMessage.textContent = "";

        const selectedLanguage = languageSelect.value;
        const leaderboard = getLeaderboardData(users, selectedLanguage);
        renderTable(leaderboard);
    });

    function renderTable(data) {
        tableBody.innerHTML = "";

        data.forEach((user, index) => {
            const row = document.createElement("tr");

            if(index === 0){
                row.classList.add("top-user");
            }

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