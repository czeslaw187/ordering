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
    }
}