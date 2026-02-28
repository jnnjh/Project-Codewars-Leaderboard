//will be used for data handling like sorting and filtering

let sortedLanguages = [];
let userData = [];

export function getLanguages(users) {
    const languages = [];
    for(let user of users) {
        let availableLanguages = user.ranks.languages

        for(let [language, val] of Object.entries(availableLanguages)) {
            if(!languages.includes(language)) {
                languages.push(language);
            }
        }
    }
    sortedLanguages = languages.sort();
    sortedLanguages.unshift("overall");

    return sortedLanguages;
}

export function getLeaderboardData(users, selectedLanguage) {
    for(let user of users) {
        let newUserData = {
            username: user.username,
            clan: user.clan,
        }
        if(selectedLanguage === "overall"){
            newUserData.score = user.ranks.overall.score
            userData.push(newUserData);
        } else if(user.ranks.languages[selectedLanguage]){
            newUserData.score = user.ranks.languages[selectedLanguage].score;
            userData.push(newUserData);
        }
    }

    return userData;
}


/*const mockData = [
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

getLeaderboardData(mockData, "python");*/