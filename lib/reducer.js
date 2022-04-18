const firstState = {
    myState: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let newState = [...state.myState]
            return {
                ...state,
                myState: newState.concat(action.payload)
            }
        case "REMOVE_ITEM":
            newState = [...state.myState]
            return {
                ...state,
                myState: newState.filter(el => {return el.id != action.payload})
            }
        default:
            return state
    }
}