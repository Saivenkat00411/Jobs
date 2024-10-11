const  { StatusCodes } = require("http-status-codes");

class NOT_FOUND_ERROR extends Error{
    constructor(message)
    {
        super(message);
        this.StatusCode=StatusCodes.NOT_FOUND;
    }
}

class UNAUTHORIZED extends Error{
    constructor(message)
    {
        super(message);
        this.StatusCode=StatusCodes.FORBIDDEN;
    }
}

class UNAUTHENTICATED extends Error{
    constructor(message)
    {
        super(message);
        this.StatusCode=StatusCodes.UNAUTHENTICATED;
    }
}

class BAD_REQUEST extends Error{
    constructor(message)
    {
        super(message);
        this.StatusCode=StatusCodes.BAD_REQUEST;
    }
}
module.exports={NOT_FOUND_ERROR,UNAUTHENTICATED,UNAUTHORIZED,BAD_REQUEST}