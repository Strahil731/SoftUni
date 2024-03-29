import { del, get, post, update } from "./requester.js"

const dataURL = {
    allFruit: "/data/fruits?sortBy=_createdOn%20desc",
    singleFruit: "/data/fruits"
}

async function getAllFruit() {
    return await get(dataURL.allFruit);
}

async function getSingleFruit(id) {
    return await get(dataURL.singleFruit + `/${id}`);
}

async function updateFruit(id, data) {
    return await update(dataURL.singleFruit + `/${id}`, data);
}

async function createFruit(data) {
    return await post(dataURL.singleFruit, data);
}

async function removeFruit(id) {
    return await del(dataURL.singleFruit + `/${id}`);
}

export { getAllFruit, getSingleFruit, updateFruit, createFruit, removeFruit }