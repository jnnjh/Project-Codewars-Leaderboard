//will be used for data handling like sorting and filtering

const languages = [];

export function getLanguages(users) {
    for(let user of users) {
        let availableLanguages = user.ranks.languages

        for(let [language, val] of Object.entries(availableLanguages)) {
            if(!languages.includes(language)) {
                languages.push(language);
            }
        }
    }
    languages.sort();
    return languages;
}