import { get } from "./requester.js";

const baseURL = "http://localhost:3030/"

const endPoints = {
    catalog: "data/movies"
};

async function getAllMovies() {
    return await get(baseURL + endPoints.catalog);
}

export {
    getAllMovies
}