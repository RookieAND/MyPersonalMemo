import axiosInstance from 'api/axiosInstance';

export const loginAccount = async (userID, userPW) => {
    let response;
    try {
        response = await axiosInstance({
            method: 'POST',
            url: '/account/login',
            data: { userID, userPW },
        });
        return response;
    } catch (err) {
        throw new Error(err);
    }
};
