const jwt = require ('jsonwebtoken');

const jwtAuthMiddleWare = (req,res,next)=>{
 const authorization = req.headers.authorization;
    console.log("--- Debugging Started ---");
    console.log("Step 1 - Full Authorization Header:", authorization);

    if (!authorization) {
        console.log("Error: No Authorization header found in request.");
        return res.status(401).json({ error: 'Token Not Found' });
    }

    // 2. Token extract karein (Bearer word hata kar)
    const token = authorization.split(' ')[1];
    console.log("Step 2 - Extracted Token:", token);

    if (!token) {
        console.log("Error: Token string is missing after 'Bearer'.");
        return res.status(401).json({ error: 'Token Not Found' });
    }

    try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET);

       req.user =decoded;
       next();
    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Invalid token'});
        
    }
}


const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleWare,generateToken};