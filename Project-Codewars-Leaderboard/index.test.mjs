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
import { fetchUser, fetchAllUser} from "./src/api.mjs";

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

test("fetchUser returns a user from the Codewars API", async () => {

    const mockResponse = {
        username: "joanne",
        clan: "ladycoders",
        ranks: {
            overall: { score: 1200 },
            languages: {
                javascript: { score: 600 }
            }
        }
    };

    nock("https://www.codewars.com")
        .get("/api/v1/users/joanne")
        .reply(200, mockResponse);

    const result = await fetchUser("joanne");

    assert.strictEqual(result.username, "joanne");

});

test("fetchUser returns correctly formatted user data", async () => {

    const mockResponse = {
        username: "john",
        clan: "warriors",
        ranks: {
            overall: { score: 1500 },
            languages: {
                javascript: { score: 800 }
            }
        }
    };

    nock("https://www.codewars.com")
        .get("/api/v1/users/john")
        .reply(200, mockResponse);

    const result = await fetchUser("john");
    console.log(result);

    assert.deepStrictEqual(result, {
        username: "john",
        clan: "warriors",
        ranks: {
            overall: { score: 1500 },
            languages: {
                javascript: { score: 800 }
            }
        }
    });

});

test("fetchUser handles users with no clan", async () => {

    const mockResponse = {
        username: "alice",
        clan: null,
        ranks: {
            overall: { score: 1000 },
            languages: {
                python: { score: 500 }
            }
        }
    };

    nock("https://www.codewars.com")
        .get("/api/v1/users/alice")
        .reply(200, mockResponse);

    const result = await fetchUser("alice");

    assert.strictEqual(result.clan, null);

});

test("fetchUser returns all language ranks", async () => {

    const mockResponse = {
        username: "jhoie",
        clan: "ladycoders",
        ranks: {
            overall: { score: 2000 },
            languages: {
                javascript: { score: 1000 },
                python: { score: 800 },
                ruby: { score: 600 }
            }
        }
    };

    nock("https://www.codewars.com")
        .get("/api/v1/users/jhoie")
        .reply(200, mockResponse);

    const result = await fetchUser("jhoie");

    assert.deepStrictEqual(result.ranks.languages, {
        javascript: { score: 1000 },
        python: { score: 800 },
        ruby: { score: 600 }
    });

});

test("fetchUser handles API 404 errors", async () => {

    nock("https://www.codewars.com")
        .get("/api/v1/users/unknownuser")
        .reply(404, {});

    await assert.rejects(
        async () => {
        await fetchUser("unknownuser");
        }
    );

});

test("fetchUser works for multiple users", async () => {

    const joanne = {
        username: "joanne",
        clan: "migracode",
        ranks: {
            overall: { score: 1200 },
            languages: { javascript: { score: 600 } }
        }
    };

    const jhoie = {
        username: "jhoie",
        clan: "ladycoders",
        ranks: {
            overall: { score: 1400 },
            languages: { python: { score: 700 } }
        }
    };

    nock("https://www.codewars.com")
        .get("/api/v1/users/joanne")
        .reply(200, joanne);

    nock("https://www.codewars.com")
        .get("/api/v1/users/jhoie")
        .reply(200, jhoie);

    const user1 = await fetchUser("joanne");
    const user2 = await fetchUser("jhoie");

    assert.strictEqual(user1.username, "joanne");
    assert.strictEqual(user2.username, "jhoie");

});