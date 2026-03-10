// will be used for all fetching logics and error handlings

export async function fetchUser(username) {
    const url = "https://www.codewars.com/api/v1/users/" + username;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`User "${username}" not found`);
            } else {
                throw new Error(`Failed to fetch user "${username}"`);
            }
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
        //console.log(data);
        return data;
    } catch (error) {
        if (error.message.includes("not found") || error.message.includes("Failed")) {
            throw error;
        }
        throw new Error(`Unable to reach Codewars API while fetching "${username}"`);
    }
}

//fetchUser("jnn33");

export async function fetchAllUsers(usernames) {
    const validUsers = [];
    const invalidUsers = [];

    for (const username of usernames) {
        try {
            const user = await fetchUser(username);
            validUsers.push(user);
        } catch (error) {
            invalidUsers.push(username);
        }
    }

    return {
        validUsers,
        invalidUsers
    };
}

//fetchAllUser(['jnnjh', 'CodeYourFuture']);