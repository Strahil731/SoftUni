import { get, post } from "./requester.js";

const baseURL = "http://localhost:3030/"

const endPoints = {
    catalog: "data/movies",
    addLike: "data/likes"
};

async function getAllMovies() {
    return await get(baseURL + endPoints.catalog);
}

async function getSingleMovie(id) {
    return await get(baseURL + endPoints.catalog + `/${id}`);
}

async function getLiked(id) {
    return await get(baseURL + `data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`)
}

async function createLike(id){
    return await post(baseURL + endPoints.addLike, {"moviesId": id});
}

export {
    getAllMovies,
    getSingleMovie,
    getLiked
}