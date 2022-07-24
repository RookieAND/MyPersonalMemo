import { memoModel } from '../model/memoSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const ControlAccount = {
    create: async function (req, res) {
        try {
            const { userID, userPW } = req.body;
            const post = await memoModel.create({
                author: { id: userID, password: userPW },
                categories: [],
            });
            res.redirect(`/memo/${post._id}`);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    },
    login: async function (req, res) {
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
