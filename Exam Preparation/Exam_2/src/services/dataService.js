import { del, get, post, update } from "./requester.js"

const motorUrl = {
    allMotors: "/data/motorcycles?sortBy=_createdOn%20desc",
    singleMotor: "/data/motorcycles",
    deleteOrUpdateMotor: "/data/motorcycles/"
}

async function getAllMotors() {
    return await get(motorUrl.allMotors);
}

async function getSingleMotor(id) {
    return await get(motorUrl.singleMotor + `/${id}`);
}

async function updateMotor(id, data) {
    return await update(motorUrl.deleteOrUpdateMotor + `${id}`, data);
}

async function createMotor(data) {
    return await post(motorUrl.singleMotor, data);
}

async function removeMotor(id) {
    return await del(motorUrl.deleteOrUpdateMotor + `${id}`);
}

export { getAllMotors, getSingleMotor, updateMotor, createMotor, removeMotor }