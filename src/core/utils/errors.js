class FetchError extends Error {
    constructor(response){
        super("Error doing fetch: " + response.statusText);
        this.name= "FetchError";
        this.status = response.status;
    }
}

export {
    FetchError
}