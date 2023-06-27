// Action to set user data
export const setUser = (userData) => {
    return {
        type: 'SET_USER',
        payload: userData,
    };
};

// Action to update user information
export const updateUser = (updatedData) => {
    return {
        type: 'UPDATE_USER',
        payload: updatedData,
    };
};

// Action to delete user data
export const deleteUser = () => {
    return {
        type: 'DELETE_USER',
    };
};
