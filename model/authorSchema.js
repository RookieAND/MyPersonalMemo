import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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
    {
        // 스키마 모델의 인스턴스 메소드 선언 (비밀번호 체크 관련)
        methods: {
            // 입력받은 비밀번호를 단방향 해시 함수로 암호화하여 DB에 저장.
            setPassword: async function (password) {
                const hashed = await bcrypt.hash(password, 10);
                this.password = hash;
            },
            // 입력 받은 비밀번호와 DB에 저장된 비밀번호가 서로 일치하는지 확인.
            checkPassword: async function (password) {
                const result = await bcrypt.compare(password, this.password);
                return result;
            },
        },
        // 스키마 모델의 스태틱 메소드 추가 선언 (유저 확인을 위함)
        statics: {
            findByName: async function (id) {
                return this.findOne({ id }) ?? false;
            },
        },
        // 해당 Schema 모델을 자동으로 JSON 변환시켜주는 옵션
        toJSON: { virtuals: true },
    }
);

export const Author = model('Author', AuthorSchema);
