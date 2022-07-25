import { memoModel } from '../model/memoSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const ControlAccount = {
    // 회원가입 관련 함수
    register: async (req, res) => {
        const { userID, userPW } = req.body;
        try {
            await memoModel.create({
                author: { id: userID, password: userPW },
                categories: [],
            });
            return res.status(200).json({ status: 'success' });
            // 기존의 계정 정보가 없을 경우, MongoDB에 새로운 계정 정보를 추가함.
        } catch (error) {
            return res.status(500).json({ status: 'fail', errcode: '003' });
        }
    },
    // 로그인 관련 함수
    login: async (req, res) => {
        let userDocs;
        const { userID, userPW } = req.body;
        try {
            userDocs = await memoModel.findOne({ author: { id: userID, pw: userPW } });
        } catch (error) {
            throw new Error(error);
        }
        // 만약 계정 정보가 존재하지 않을 경우 (null) 에러 코드 전송;
        if (!userDocs) {
            console.log('계정 정보 없음');
            return res.json({ status: 'fail' });
        }
        return res.json({ ...userDocs, status: 'success' });
    },
};
