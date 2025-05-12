// 입력 필드 최대 글자수 정책
const MAX_LENGTH = {
    text: 20,
    textarea: 50,
};

// 필드 type: text, textarea, select, date, checkbox
export const FORM_VALIDATION = {
    text: {
        MAX_LENGTH: MAX_LENGTH.text,
        ERROR_MESSAGE: `글자수 ${MAX_LENGTH.text}을 초과할 수 없습니다.`,
    },
    textarea: {
        MAX_LENGTH: MAX_LENGTH.textarea,
        ERROR_MESSAGE: `글자수 ${MAX_LENGTH.textarea}을 초과할 수 없습니다.`,
    },
} as const;
