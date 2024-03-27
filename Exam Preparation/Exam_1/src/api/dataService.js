import { del, get, post, update } from "./requester.js"

const dataURL = {
    getAllIdea: "data/events?sortBy=_createdOn%20desc",
    singleIdea: "data/events"
}

async function getAllIdeas() {
    return await get(dataURL.getAllIdea);
}

async function getIdea(id) {
    return await get(dataURL.singleIdea + `/${id}`);
}

async function updateIdea(id, data) {
    return await update(dataURL.singleIdea + `/${id}`, data);
}

async function createIdea(data) {
    return await post(dataURL.singleIdea, data);
}

async function removeIdea(id) {
    return await del(dataURL.singleIdea + `/${id}`);
}

export { getAllIdeas, getIdea, updateIdea, createIdea, removeIdea }