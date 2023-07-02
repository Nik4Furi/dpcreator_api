//-----------------requiring the constraints------------------X
const jwt = require('jsonwebtoken'); //to generate the secrets key

const FetchUser = async (req, res, next) => {
    //Check we get the token 
    const token = req.header('auth-token');
    try {

        if (!token) {
            return res.status(401).json({ success: false, msg: 'We did not get the token' })
        }
        const data = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = data.users;

        next();

    } catch (error) {
        return res.status(500).json({ success: false, msg: `Error occured during getting the token ${error}` })
    }
}

module.exports = FetchUser;