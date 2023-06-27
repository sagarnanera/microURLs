// userReducer.js
const initialState = {
    userData: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, userData: action.payload };
        // Add more cases as needed for user-related actions

        default:
            return state;
    }
};

export default userReducer;