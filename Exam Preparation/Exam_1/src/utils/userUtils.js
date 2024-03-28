function getUser() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function hasUser() {
    return !!getUser();
}

function removeUser() {
    sessionStorage.removeItem("userData");
}

function hasOwner(id) {
    return getUser()._id === id;
}

function setCounter(data) {
    let counter = new Map();
    for (let event of data) {
        counter.set(event._id, 0);
    }
    sessionStorage.setItem("counter", counter);
}

function getCounter() {
    return sessionStorage.getItem("counter");
}

export { getUser, setUser, hasUser, removeUser, hasOwner, setCounter, getCounter }