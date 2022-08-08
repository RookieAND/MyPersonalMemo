import axiosInstance from 'api/axiosInstance';

export const accountControl = {
    loginAccount: async (userID, userPW) => {
        let response;
        try {
            response = await axiosInstance({
                method: 'POST',
                url: '/account/login',
                data: { userID, userPW },
            });
            localStorage.setItem('access_token', response.token);
            return response;
        } catch (err) {
            const errCode = err.response.data.errcode;
            throw new Error(errCode);
        }
    },
    registerAccount: async (userID, userPW) => {
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
            localStorage.setItem('access_token', response.token);
        } catch (err) {
            console.log(err);
            const errCode = err.response.data.errcode;
            throw new Error(errCode);
        }
    },
    logoutAccount: async () => {
        try {
            await axiosInstance({
                method: 'GET',
                url: '/account/logout',
            });
            localStorage.removeItem('access_token');
            window.location.reload();
        } catch (err) {
            console.log(err);
            const errCode = err.response.data.errcode;
            throw new Error(errCode);
        }
    },
};
