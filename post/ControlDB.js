import { Memo } from '../model/memoSchema.js';

// MongoDB 에서 요구하는 작업을 이곳에서 수행.
export const createUserMemo = async (req, res) => {
    try {
        const { userID, userPW } = req.body;
        const post = await Memo.create({
            author: { id: userID, password: userPW },
            categories: [],
        });
        res.redirect(`/memo/${post._id}`);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};
