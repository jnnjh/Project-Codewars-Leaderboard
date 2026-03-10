// will be used for all fetching logics and error handlings

export async function fetchUser(username) {
    const url = "https://www.codewars.com/api/v1/users/" + username;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }

        const result = await response.json();
        const data = {
            username: result.username,
            clan: result.clan,
            ranks: {
                overall: {score: result.ranks.overall.score},
                languages: result.ranks.languages
            }
        }
        console.log(data);
        return data;
    } catch (error) {
        throw(error);
    }
}

//fetchUser("jnnjh");

export async function fetchAllUser(usernames) {
    const promises = usernames.map(username => fetchUser(username));
    const data = await Promise.all(promises)
    //console.log(data);
    return data;
}

//fetchAllUser(['jnnjh', 'CodeYourFuture']);