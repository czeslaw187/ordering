const firstState = {
    myState: []
}

export default function reducer(state=firstState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                myState: action.payload
            }
    }
}