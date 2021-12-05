import axios from "axios";
const authToken = () => {
    const userDetail = sessionStorage.getItem('user');
    const user = JSON.parse(userDetail);
    console.log(user)
    return user?.token
}
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
})
instance.interceptors.request.use((config) => {
    console.log("DARSHAN")
    config.headers.Authorization = `Token ${authToken()}`;
    return config;
})
instance.defaults.headers.common["Content-Type"] = `application/json`;

export default instance;