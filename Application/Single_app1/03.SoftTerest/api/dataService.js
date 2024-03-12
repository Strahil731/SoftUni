import { del, get, post } from "./requester.js";

const endPoints = {
    getAllIdea: "data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc",
    singleIdea: "data/ideas/"
};

async function getAllIdeas() {
    return await get(endPoints.getAllIdea);
}

async function getIdea(id) {
    return await get(endPoints.singleIdea + id);
}

async function createIdea(data) {
    return await post(endPoints.singleIdea, data);
}

async function removeIdea(id) {
    return await del(endPoints.singleIdea + id);
}

export const dataService = {
    getAllIdeas,
    getIdea,
    createIdea,
    removeIdea
};