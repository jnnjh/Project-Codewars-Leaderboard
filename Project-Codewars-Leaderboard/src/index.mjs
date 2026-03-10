import { parseUsernames } from "./utility.mjs";
import { fetchUser, fetchAllUsers } from "./api.mjs";
import { getLeaderboardData } from "./leaderboard.mjs";

const form = document.querySelector("#user-form");
const input = document.querySelector("#user-input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = input.value;
  const usernames = parseUsernames(inputValue);

  console.log(usernames);
});