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

export function getCreds(credentials) {
    return(dispatch)=>{
        return axios.post(process.env.NEXT_PUBLIC_URL + '/api/admin/checkLoginCreds',{
            credentials: credentials
        })
        .then(resp=>{console.log(resp.data, 'creds'); dispatch({type:"IS_LOGGED", payload:resp.data})})
    }
}

// export function importAdminOrders(search) {
//     return(dispatch)=>{
//         return axios.get(process.env.NEXT_PUBLIC_URL + '/api/admin/getAllOrders')
//         .then(resp=>dispatch({type:"ADD_ADMIN_ORDER", payload:resp}))
//     }
// }
