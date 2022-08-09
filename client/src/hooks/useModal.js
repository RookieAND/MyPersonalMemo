import { useState } from 'react';

// 모달의 현재 상태, 내용, 토글 함수를 지원하는 Custom Hook
const useModal = () => {
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content = false) => {
        if (content) {
            setModalState(true);
            setModalContent(content);
        }
    };

    const closeModal = () => {
        setModalState(false);
        setModalContent('');
    };

    return { modalState, modalContent, openModal, closeModal };
};

export default useModal;
