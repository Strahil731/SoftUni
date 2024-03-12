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

function hasOnwer(id) {
    return getUser()._id === id;
}

export { getUser, setUser, hasUser, removeUser, hasOnwer }