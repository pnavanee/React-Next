import fetch from "isomorphic-unfetch";
import {END_POINT} from "../constants";

export const getProducts = () => {
      return fetch(`${END_POINT}/products`)
       .then( r => r.json())
       .then((data)=>{
            return {
                 type : "PRODUCTS",
                 payload : {products : data}
            }
       })
      
}

export const getProduct = (pid) => {
    return fetch(`${END_POINT}/products/${pid}`)
    .then( r => r.json())
    .then((data)=>{
       return {
            type : "PRODUCT",
            payload : {product : data}
       }
    })
}

export const deleteProduct =  (pid) => {
   return dispatch => {
     fetch(`${END_POINT}/products/${pid}`,{
        method : "DELETE"
     }).then( r => {
         dispatch({
              type : "ALERT",
              payload : {alertMessage : "Product deleted successfully"}
         })
         dispatch({
              type : "DELETE_PRODUCT",
              payload : {productId : pid}
         })           
     })
   }
 }
 
export const editProduct = (pid, product) => {
return dispatch => {
 fetch(`${END_POINT}/products/${pid}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(product),
   }).then((r) => {
     dispatch({
          type : "ALERT",
          payload : {alertMessage : "Product updated successfully"}
     })
   });
}
}


export const addProduct = (product) => {
return dispatch => {
fetch(`${END_POINT}/products`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(product),
   }).then((r) => {
     dispatch({
          type : "ALERT",
          payload : {alertMessage : "Product added successfully"}
     })
   });
}
}
