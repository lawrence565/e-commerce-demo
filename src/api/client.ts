import axios from "axios";

const baseURL = "http://localhost:8080";
const apiPath = "api";

export const client = axios.create({
    baseURL: `${baseURL}/${apiPath}/`,
    withCredentials: true,
});
