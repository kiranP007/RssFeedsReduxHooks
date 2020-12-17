const initState = {
    ui: {
        error: ""
    }
}

const createReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE/CREATE_FORM_FAILED":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    error: action.error
                }
            }
        default:
            return state
    }
}

export default createReducer