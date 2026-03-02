// will be used for all fetching logics and error handlings

async function fetchUser(username) {
    const url = "https://codewars.com/api/v1/users/" + username;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

//fetchUser("jnnjh");

async function fetchAllUser(usernames) {
    const promises = usernames.map(username => fetchUser(username));
    const data = await Promise.all(promises)
    console.log(data);
    return data;
}

fetchAllUser(['jnnjh', 'CodeYourFuture']);