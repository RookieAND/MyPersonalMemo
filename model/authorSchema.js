import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { jwtUtil } from '../api/jwtUtil.js';

const { Schema, model } = mongoose;

// Author Schema : id, password, 가입 일자로 구성.
const AuthorSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            uinque: true,
        },
        password: {
            type: String,
            required: true,
        },
        registed: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    // 해당 Schema 모델을 자동으로 JSON 변환시켜주는 옵션
    { toJSON: { virtuals: true } }
);

/* 
    스키마 모델의 인스턴스 메소드 선언 (비밀번호 체크 관련)
    스키마 모델의 스태틱 메소드 추가 선언 (유저 확인을 위함)
*/

// 입력 받은 비밀번호와 DB에 저장된 비밀번호가 일치하는지 확인하는 메소드
AuthorSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};
// 입력받은 비밀번호를 단방향 해시 함수로 암호화하여 DB에 저장하는 메소드.
AuthorSchema.methods.setPassword = async function (password) {
    const hashed = await bcrypt.hash(password, 10);
    this.password = hashed;
};

// 로그인에 성공할 경우, 해당 ID로 JWT 토큰을 발급하여 제공하는 메소드.
AuthorSchema.methods.applyToken = function () {
    const payload = { id: this.id, registed: this.registed };
    const accessToken = jwtUtil.generateToken(payload);
    const refreshToken = jwtUtil.generateRefreshToken(payload);
    return { accessToken, refreshToken };
};

// 특정 ID에 해당되는 Document를 찾아서 반환시켜주는 스태틱 메소드.
AuthorSchema.statics.isUserExist = async function (id) {
    // exec() 함수를 붙여야 Promise 객체가 리턴됨.
    const result = await this.findOne({ id }).exec();
    return result ?? false;
};

export const Author = model('Author', AuthorSchema);
