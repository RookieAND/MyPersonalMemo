import { memoModel } from '../model/memoSchema.js';
import { authorModel } from '../model/authorSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const ControlAccount = {
    // 회원가입 관련 함수 (유저, 메모 계정 생성)
    register: async (req, res) => {
        const { userID, userPW } = req.body;
        // 먼저, 기존의 계정이 존재하는지를 체크해야 함. (ID만 체크)
        const userData = await authorModel.findOne({ id: userID });
        if (userData) {
            return res.json({ result: 'failure', errcode: '001' });
        }
        // 먼저 author model을 생성하고, 그 뒤 memo model을 생성해야 함.
        try {
            const newAuthor = new authorModel({ id: userID, password: userPW });
            await newAuthor.save();
            const newMemo = new memoModel({
                categories: [],
            });
            newMemo.author = newAuthor;
            await newMemo.save();
            return res.json({ result: 'success' });
            // 기존의 계정 정보가 없을 경우, MongoDB에 새로운 계정 정보를 추가함.
        } catch (error) {
            console.log(error);
            return res.json({ result: 'failure', errcode: '003' });
        }
    },
    // 로그인 관련 함수
    login: async (req, res) => {
        let userDocs;
        const { userID, userPW } = req.body;
        try {
            userDocs = await authorModel.findOne({ id: userID, pw: userPW });
        } catch (error) {
            throw new Error(error);
        }
        // 만약 계정 정보가 존재하지 않을 경우 (null) 에러 코드 전송;
        if (!userDocs) {
            return res.json({ status: 'fail', errcode: '001' });
        }
        const userMemo = await memoModel.findOne({ author: userDocs });
        return res.json({ status: 'success' });
    },
};
