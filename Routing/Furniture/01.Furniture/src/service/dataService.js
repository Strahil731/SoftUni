import { api } from "../requester.js";

const BASE_URL = "http://localhost:3030/data/";

const endPoints = {
    myFurniture: (userId) => `catalog?where=_ownerId%3D%22${userId}%22`,
    furniture: "catalog"
}

async function createFurniture(data) {
    return await api.post(BASE_URL + endPoints.furniture, data);
}

async function getAllFurniture() {
    return await api.get(BASE_URL + endPoints.furniture);
}

async function getDetailsFurniture(id) {
    return await api.get(BASE_URL + endPoints.furniture + `/${id}`);
}

async function deleteFurniture(id) {
    return await api.del(BASE_URL + endPoints.furniture + `/${id}`);
}

async function getMyFurniture(userId) {
    return await api.get(BASE_URL + endPoints.myFurniture(userId));
}

async function updateFurniture(id, data) {
    return await api.update(BASE_URL + endPoints.furniture + `/${id}`, data);
}

export const dataService = {
    createFurniture,
    getAllFurniture,
    deleteFurniture,
    getDetailsFurniture,
    getMyFurniture,
    updateFurniture
}