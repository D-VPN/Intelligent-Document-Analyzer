import axios from "axios";
const authToken = () => {
    const userDetail = sessionStorage.getItem('user');
    const user = JSON.parse(userDetail);
    return user?.token
}
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
})
instance.defaults.headers.common["Authorization"] = `Token ${authToken()}`;
instance.defaults.headers.common["Content-Type"] = `application/json`;
export default instance;