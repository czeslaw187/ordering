import axios from 'axios'

export function addFoodItem(item) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/assignId',{
            item: item
        })
        .then(data=>{dispatch({type:"ADD_ITEM",payload:data})})
    }
}

export function getTimeDistance(coords) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/getTimeDistance',{
            coords:coords
        })
        .then(data=>{dispatch({type:"TIME_DISTANCE",payload:data})})
    }
}
