import axiosInstance from 'api/axiosInstance';

export const registerAccount = async (userID, userPW) => {
    let response;
    try {
        response = await axiosInstance({
            method: 'POST',
            url: '/account/register',
            data: {
                userID,
                userPW,
            },
        });
        console.log(response);
        return response;
    } catch (err) {
        throw new Error(err);
    }
};
