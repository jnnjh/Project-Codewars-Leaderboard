// This is a placeholder file which shows how you use the nock library to
// "mock" fetch requests, replacing real requests with fake ones that you
// control in the test. This means you can "force" the fetch request to return
// data in the format that you want.
// IMPORTANT: You _must_ run npm install within the Project-Codewars-Leaderboard
// folder for this to work.
// You can change or delete the contents of the file once you have understood
// how it works.

import test from "node:test";
import assert from "node:assert";
import nock from "nock";
import { makeFetchRequest } from "./src/index.mjs";

import { parseUsernames } from "./src/utility.mjs";
import { getLanguages, getLeaderboardData } from "./src/leaderboard.mjs";

const mockData = [
        {
            "username": "alice",
            "name": "Alice Example",
            "honor": 1500,
            "clan": "Alpha",
            "leaderboardPosition": 42,
            "skills": ["javascript", "ruby", "python"],
            "ranks": {
                "overall": { "rank": -3, "name": "3 kyu", "color": "blue", "score": 2000 },
                "languages": {
                    "javascript": { "rank": -3, "name": "3 kyu", "color": "blue", "score": 1500 },
                    "ruby": { "rank": -4, "name": "4 kyu", "color": "blue", "score": 1000 }
                }
            },
            "codeChallenges": { "totalAuthored": 2, "totalCompleted": 120 }
        },
        {
            "username": "bob",
            "name": "Bob Example",
            "honor": 1200,
            "clan": "Beta",
            "leaderboardPosition": 85,
            "skills": ["javascript", "python", "c#"],
            "ranks": {
                "overall": { "rank": -4, "name": "4 kyu", "color": "blue", "score": 1800 },
                "languages": {
                    "javascript": { "rank": -3, "name": "3 kyu", "color": "blue", "score": 1200 },
                    "python": { "rank": -4, "name": "4 kyu", "color": "blue", "score": 900 }
                }
            },
            "codeChallenges": { "totalAuthored": 1, "totalCompleted": 95 }
        },
        {
            "username": "carol",
            "name": "Carol Example",
            "honor": 900,
            "clan": "Gamma",
            "leaderboardPosition": 120,
            "skills": ["ruby", "coffeescript", "nodejs"],
            "ranks": {
                "overall": { "rank": -5, "name": "5 kyu", "color": "blue", "score": 1600 },
                    "languages": {
                        "ruby": { "rank": -4, "name": "4 kyu", "color": "blue", "score": 1100 },
                        "coffeescript": { "rank": -5, "name": "5 kyu", "color": "blue", "score": 700 }
                    }
            },
            "codeChallenges": { "totalAuthored": 0, "totalCompleted": 60 }
        }
    ];

test("mocks a fetch function", async () => {
    // Create a fetch request "mock" using the nock library, which "replaces"
    // real requests with fake ones that we can control in the test using nock
    // functions.
    // In this example, we set up nock so that it looks for GET requests to
    // https://example.com/test (no other URLs will work) and responds with a 200
    // HTTP status code, and the body {"user": "someone"}.
    const scope = nock("https://example.com").get("/test").reply(200, JSON.stringify({ user: "someone" }));

    // Check that the response we got back included the fake body we set up.
    const response = await makeFetchRequest();
    const parsedResponse = await response.json();
    assert(parsedResponse.user === "someone");

    // Ensure that a fetch request has been replaced by the nock library. This
    // helps ensure that you're not making real fetch requests that don't match
    // the nock configuration.
    assert(scope.isDone() === true, "No matching fetch request has been made");
});


test("mock test of parsing of string inputs separated by comma", () => {
    const input = "Jey, John, Joanne, Jhoie, Joxer, Jojo, Juba";
    const output = ["Jey", "John", "Joanne", "Jhoie", "Joxer", "Jojo", "Juba"];
    assert.deepStrictEqual(parseUsernames(input), output);
})


test("mock test of getting the array of languages(and overall) of users to be shown in the dropdown selection", () => {
    const output = ["overall", "coffeescript", "javascript", "python", "ruby"];
    assert.deepStrictEqual(getLanguages(mockData), output);
})


test("mock test of getting the leaderboard data of users depending on the language selected", () => {
    const selectedLanguage = "javascript"
    const output = [
            { username: 'alice', clan: 'Alpha', score: 1500 },
            { username: 'bob', clan: 'Beta', score: 1200 }
        ];
    assert.deepStrictEqual(getLeaderboardData(mockData, selectedLanguage), output);
})

