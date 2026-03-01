//will be used for small helper logics like parsing names etc.



//this function split username inputs that are separated by comma and put them in an array.
export function parseUsernames(usernames) {
    if(usernames === "") return [];
    const usernameInput = usernames.split(",").map(name => name.trim());
    return usernameInput;
}

//parseUsernames("Jey, John, Joanne, Jhoie, Joxer, Jojo, Juba");