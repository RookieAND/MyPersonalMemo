import axios from 'axios';

// HTTPS 통신에 쓰이는 Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
});

// 1. 요청 인터셉터 설정 (요청 성공 / 실패)
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 2. 응답 인터셉터 설정 (응답 성공 / 실패)
axiosInstance.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
