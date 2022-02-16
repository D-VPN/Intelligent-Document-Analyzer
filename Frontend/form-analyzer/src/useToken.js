import { useState } from "react";
export default function useToken() {
    const getToken = () => {
        const userDetail = localStorage.getItem('user');
        const user = JSON.parse(userDetail);

        return user?.token
    };
    const [token, setToken] = useState(getToken());
    const saveToken = user => {
        if (typeof user === "undefined") {
            localStorage.removeItem('user');
            setToken()
        }
        else {
            localStorage.setItem('user', JSON.stringify(user));
            setToken(user.token);
        }
    };

    return {
        token: token,
        setToken: saveToken,
    }
}