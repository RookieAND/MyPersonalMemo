import { Memo } from '../model/memoSchema.js';
import { Author } from '../model/authorSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const ControlAccount = {
    // 회원가입 관련 함수 (유저, 메모 계정 생성)
    register: async (req, res) => {
        const { userID, userPW } = req.body;
        // 먼저, 기존의 계정이 존재하는지를 체크해야 함. (ID만 체크)
        try {
            const isExist = await Author.isUserExist(userID);
            if (isExist) {
                return res.status(400).json({ status: 'fail', errcode: '001' });
            }

            // 그 다음, 입력 받은 정보를 토대로 새로운 데이터를 생성함.
            // 이 과정에서 입력 받은 비밀번호를 해쉬 함수로 암호화 함.
            const newAuthor = new Author({ id: userID });
            await newAuthor.setPassword(userPW);
            await newAuthor.save();

            // 마지막으로 memo 관련 데이터를 생성하고, author 와 연동시킴.
            const newMemo = await Memo.create({
                author: newAuthor,
                categories: [],
            });
            return res.json({ result: 'success', data: newMemo.categories });
        } catch (error) {
            console.log(error);
            return res.json({ result: 'failure', errcode: '003' });
        }
    },
    // 로그인 관련 함수
    login: async (req, res) => {
        const { userID, userPW } = req.body;
        try {
            // 만약 계정 정보가 존재하지 않을 경우 (null) 에러 코드 전송;
            const userInfo = await Author.isUserExist(userID);
            if (!userInfo) {
                return res.json({ status: 'fail', errcode: '001' });
            }
            // 입력한 비밀번호가 일치하는지를 확인하고, 이에 대한 결과를 확인.
            const isMatch = await userInfo.checkPassword(userPW);
            if (!isMatch) {
                return res.json({ status: 'fail', errcode: '003' });
            }
            // 해당 유저의 메모 정보를 로드한 후, 이를 클라이언트로 전송함.
            const userMemo = await Memo.getUserMemos(userID);
            console.log(userMemo);
            return res.json({ status: 'success', data: userMemo.categories });
        } catch (error) {
            throw new Error(error);
        }
    },
};
