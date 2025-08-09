import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
    try{
        const {success} =await ratelimit.limit("My-Limits-Key");

        if(!success) {
            return res.status(429).json({
            message:"Too many requests, try again later"
        })
    }
    
    next();
}catch(error){
    console.log("Rate limit error", error);
    next(error);
}
};

export default rateLimiter;