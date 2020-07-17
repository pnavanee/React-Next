import fetch from "isomorphic-unfetch";
import {END_POINT} from "../constants";

export const getProducts = () => {
     return  fetch(`${END_POINT}/products`)
       .then( r => r.json())
       .then((data)=>{
            return {
                 type : "PRODUCTS",
                 payload : data
            }
       })
      
}
