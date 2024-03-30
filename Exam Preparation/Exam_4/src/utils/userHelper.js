function getUser() {
    return JSON.parse(sessionStorage.getItem("userData"));
}

function setUser(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}

function hasUSer() {
    return !!getUser();
}

function removeUser() {
    sessionStorage.removeItem("userData");
}

function hasOwner(id) {
    return getUser() !== null && getUser()._id === id;
}

export { getUser, setUser, hasUSer, removeUser, hasOwner }