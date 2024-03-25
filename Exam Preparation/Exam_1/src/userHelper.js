function setUserData(userData) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
}

function getUserData() {
    return sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData"));
}

function getUserToken() {
    const userData = getUserData();
    return userData?.accessToken;
}

function clearUserData() {
    sessionStorage.removeItem("userData");
}

function getUserId() {
    const userData = getUserData();
    return userData?._id;
}

function hasOwner(ownerId) {
    const id = getUserId();
    return ownerId === id;
}

export {
    setUserData,
    getUserData,
    getUserToken,
    clearUserData,
    getUserId,
    hasOwner
}