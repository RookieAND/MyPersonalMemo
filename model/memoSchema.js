import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/* 
    MemoList DB Schema의 구성 요소를 설계.
    MemoList => Category => Memo 순으로 설계
*/

// Memo Schema : 메모 별 고유 id, 제목과 부가 설명으로 구성.
const Memo = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: String,
    desc: String,
});

// Category Schema : 카테고리 이름과 하위 메모 목록으로 구성.
const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    memos: [Memo],
});

// MemoList Schema : 소유주 정보와 하위 카테고리 목록들로 구성.
// 소유주 정보인 author의 경우, 레퍼런스로 Author 스키마를 사용.
const MemoList = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'Author',
        required: true,
        unique: true,
    },
    categories: [Category],
});

// 제작한 Schema 를 Model로 변환하여 사용하도록 설정.
export const memoModel = model('Memo', MemoList);
