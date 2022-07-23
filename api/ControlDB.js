import axiosInstance from './core/axiosInstance';

// MongoDB 에서 요구하는
const ControlDB = {
    getUser(userName) {
        return axiosInstance({
            method: 'GET',
            url: `/user/${userName}`,
        });
    },
    addUser(userName) {
        return axiosInstance({
            method: 'POST',
            url: `/user/add`,
            params: {
                username: `${userName}`,
            },
        });
    },
};

export default ControlDB;
