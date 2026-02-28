//will be used for small helper logics like parsing names etc.

//this function split username inputs that are separated by comma and put them in an array.
export function parseUsernames(usernames) {
    const usernameInput = usernames.split(",").map(name => name.trim());
    console.log(usernameInput);
}
