import fetch from "isomorphic-unfetch";
import {END_POINT} from "../constants";

export const getProducts = () => {
    return dispatch => {
       fetch(`${END_POINT}/products`)
       .then( r => r.json())
       .then((data)=>{
            dispatch({
                 type : "PRODUCTS",
                 payload : data
            })
       })
      
    }
}
