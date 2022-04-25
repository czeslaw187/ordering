const firstState = {
    myState: [],
    total:[],
    details: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.myState]
            let newState2 = state.total
            let newState3 = state.details
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
        default:
            return state
    }
}