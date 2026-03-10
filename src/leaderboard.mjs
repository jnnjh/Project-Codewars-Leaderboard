//will be used for data handling like sorting and filtering

export function getLanguages(users) {
    const languages = [];
    for(let user of users) {
        if (!user.ranks || !user.ranks.languages) continue;
        let availableLanguages = user.ranks.languages

        for(let language of Object.keys(availableLanguages)) {
            if(!languages.includes(language)) {
                languages.push(language);
            }
        }
    }
    let sortedLanguages = languages.sort();
    sortedLanguages.unshift("overall");

    return sortedLanguages;
}

export function getLeaderboardData(users, selectedLanguage) {
    let userData = [];
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

    return sortScoreByDesc(userData);
}


export function sortScoreByDesc(userData) {
    return userData.slice().sort((a, b) => b.score - a.score);
}