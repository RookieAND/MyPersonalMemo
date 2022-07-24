import axiosInstance from 'api/axiosInstance';
import axios from 'axios';

export const sendLoginInfo = async (userID, userPW) => {
    let response;
    try {
        response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/account/login',
            data: {
                userID,
                userPW,
            },
        });
    } catch (err) {
        throw new Error(err);
    }
    return response;
};
