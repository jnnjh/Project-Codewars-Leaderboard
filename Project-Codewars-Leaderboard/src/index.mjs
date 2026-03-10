import { parseUsernames } from "./utility.mjs";
import { fetchUser, fetchAllUsers } from "./api.mjs";
import { getLeaderboardData } from "./leaderboard.mjs";

export function makeFetchRequest() {
  return fetch("https://example.com/test");
}

const form = document.querySelector("#user-form");
const input = document.querySelector("#user-input");
const tableBody = document.querySelector("#leaderboard-body");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputValue = input.value;
    const usernames = parseUsernames(inputValue);

    const users = await fetchAllUsers(usernames);
    const leaderboard = getLeaderboardData(users, "overall");

    //console.log(usernames);
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