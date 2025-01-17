const users = new Map();

function getUser(id){
    return users.get(id);
}

function verifyUser(id, password){
    const user = getUser(id);

    if(!user){
        return false;
    }

    return user.password === password;
}

function createUser(id, password){
    if(getUser(id)) {
        return false;
    }

    const user = {
        id: id,
        password: password,
        claimed: [],
    };
    users.set(id, user);
    return true;
}

function addClaimed(name, id){
    const user = getUser(name);

    if (user) {
        user.claimed.push(id);
        return true;
    }

    return false;
}

function getClaimed(name){
    const user = getUser(name);
    if (user) {
        return user.claimed;
    }
    return [];
}

function resetAllUsers(){
    users.clear();
}
function initUser(){
    createUser("Test", "1234")
}

module.exports = {
    addClaimed,
    verifyUser,
    createUser,
    getUser,
    getClaimed,
    resetAllUsers,
    initUser,
};