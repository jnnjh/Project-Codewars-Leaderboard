// will be used for all fetching logics and error handlings

async function fetchUser(username) {
    const url = "https://codewars.com/api/v1/users/" + username;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

fetchUser("jnnjh");