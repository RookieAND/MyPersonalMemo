import mongoose from 'mongoose';

const { Schema, model } = mongoose;

/* 
    MemoList DB Schema의 구성 요소를 설계.
    MemoList => Category => Memo 순으로 설계
*/

// Author Schema : id, password로 구성.
const Author = new Schema({
    id: String,
    password: String,
});

// Memo Schema : 메모 별 고유 id, 제목과 부가 설명으로 구성.
const Memo = new Schema({
    id: Number,
    title: String,
    desc: String,
});

// Category Schema : 카테고리 이름과 하위 메모 목록으로 구성.
const Category = new Schema({
    name: String,
    memos: [Memo],
});

// MemoList Schema : 소유주 정보와 하위 카테고리 목록들로 구성.
const MemoList = new Schema({
    author: Author,
    categories: [Category],
});

export const memoModel = model('UserMemo', MemoList);
