import mongoose from 'mongoose';
import { Author } from './authorSchema.js';

const { Schema, model } = mongoose;

/* 
    MemoList DB Schema의 구성 요소를 설계.
    MemoList => Category => Memo 순으로 설계
*/

// Memo Schema : 메모 별 고유 id, 제목과 부가 설명으로 구성.
const MemoSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: String,
    desc: String,
});

// Category Schema : 카테고리 이름과 하위 메모 목록으로 구성.
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    memos: [MemoSchema],
});

// MemoList Schema : 소유주 정보와 하위 카테고리 목록들로 구성.
// 소유주 정보인 author의 경우, 레퍼런스로 Author 스키마를 사용.
const MemoListSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
            required: true,
            unique: true,
        },
        categories: [CategorySchema],
    },
    {
        // 해당 Schema 모델을 자동으로 JSON 변환시켜주는 옵션
        toJSON: { virtuals: true },
    }
);

// 특정 ID 의 유저가 보유한 메모 목록을 가져오는 스태틱 함수 선언.
MemoListSchema.statics.getUserMemos = async function (userID) {
    const memoAuthor = await Author.findOne({ id: userID }).exec();
    const memoInfo = await this.findOne({ author: memoAuthor }).exec();
    return memoInfo;
};

// 제작한 Schema 를 Model로 변환하여 사용하도록 설정.
export const Memo = model('Memo', MemoListSchema);
