const firstState = {
    myState: [],
    total:[]
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.myState]
            let newState2 = state.total
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
        default:
            return state
    }
}