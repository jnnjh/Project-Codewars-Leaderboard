//will be used for small helper logics like parsing names etc.

export function parseUsernames(usernames) {
    const usernameInput = usernames.split(",").map(name => name.trim());
    console.log(usernameInput);
}