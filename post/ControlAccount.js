import { Memo } from '../model/memoSchema.js';
import { Author } from '../model/authorSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const ControlAccount = {
    // 회원가입 관련 함수 (유저, 메모 계정 생성)
    register: async (req, res) => {
        const { userID, userPW } = req.body;
        try {
            // 먼저, 기존의 계정이 존재하는지를 체크해야 함. (ID만 체크)
            const isExist = await Author.findByName(userID);
            if (!isExist) {
                return res.status(400).json({ status: 'fail', errcode: '001' });
            }

            // 그 다음, 입력 받은 정보를 토대로 새로운 데이터를 생성함.
            // 이 과정에서 입력 받은 비밀번호를 해쉬 함수로 암호화 함.
            const newAuthor = new Author({ id: userID });
            await newAuthor.setPassword(userPW);
            await newAuthor.save();

            // 마지막으로 memo 관련 데이터를 생성하고, author 와 연동시킴.
            const newMemo = new Memo({
                author: newAuthor,
                categories: [],
            });
            await newMemo.save();

            return res.json({ result: 'success', data: newMemo });
            // 기존의 계정 정보가 없을 경우, MongoDB에 새로운 계정 정보를 추가함.
        } catch (error) {
            console.log(error);
            return res.json({ result: 'failure', errcode: '003' });
        }
    },
    // 로그인 관련 함수
    login: async (req, res) => {
        const { userID, userPW } = req.body;
        try {
            const isExist = await Author.findByName(userID);
            if (!isExist) {
                return res.status(400).json({ status: 'fail', errcode: '001' });
            }
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
