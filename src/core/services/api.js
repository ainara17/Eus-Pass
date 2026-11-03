import {FetchError} from "../utils/errors.js"

const API_URL = "https://api.euskadi.eus/culture/events/v1.0/events/upcoming";



async function fetchData(){
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new FetchError(response);
        }

        const result = await response.json();
        return {
            error: null,
            data: result
        }
    }catch(error){
        console.error('Error en fetchData:', error);
        return{
            error: error,
            data: null
        };
    }
}

export {
    API_URL,
    fetchData
}