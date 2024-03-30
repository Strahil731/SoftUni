import { del, get, post, update } from "./requester.js"

const dataUrl = {
    allCyberpunk: "/data/cyberpunk?sortBy=_createdOn%20desc",
    singleCyberpunk: "/data/cyberpunk"
}

async function getAllCyberpunk() {
    return await get(dataUrl.allCyberpunk);
}

async function getSingleCyberpunk(id) {
    return await get(dataUrl.singleCyberpunk + `/${id}`);
}

async function updateCyberpunk(id, data) {
    return await update(dataUrl.singleCyberpunk + `/${id}`, data);
}

async function createCyberpunk(data) {
    return await post(dataUrl.singleCyberpunk, data);
}

async function removeCyberpunk(id) {
    return await del(dataUrl.singleCyberpunk + `/${id}`);
}

export { getAllCyberpunk, getSingleCyberpunk, updateCyberpunk, createCyberpunk, removeCyberpunk }