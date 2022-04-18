import axios from 'axios'

export function addFoodItem(item) {
    return(dispatch)=>{
        return axios.post('http://localhost:3000/api/assignId',{
            item: item
        })
               .then(data=>{dispatch({type:"ADD_ITEM",payload:data})})
    }
}
