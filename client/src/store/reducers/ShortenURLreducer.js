// reducer.js
const initialState = {
    originalURL: '',
    shortenedUrl: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHORTENED_URL':
            return {
                ...state,
                shortenedUrl: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;