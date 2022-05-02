const firstState = {
    myState: [],
    total:[],
    details: [],
    timeDist: [],
    isLogged:false
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.myState]
            let newState2 = state.total
            let newState3 = state.details
            let newState4 = state.timeDist
            return {
                ...state,
                myState: newState.concat(action.payload)
            }
        case "REMOVE_ITEM":
            newState = [...state.myState]
            return {
                ...state,
                myState: newState.filter(el => {return el.data[0].id != action.payload})
            }
        case "ADD_TOTAL":
            newState2 = action.payload
            return {
                ...state,
                total: newState2
            }
        case "CLEAR_STORE":
            return {
                ...state,
                myState: [],
                total: [],
                details:[]
            }
        case "CUSTOMER":
            newState3 = action.payload
            return {
                ...state,
                details: newState3
            }
        case "TIME_DISTANCE":
            newState4 = action.payload
            return {
                ...state,
                timeDist: newState4
            }
        case "IS_LOGGED":
            return {
                ...state,
                isLogged:action.payload
            }
        default:
            return state
    }
}