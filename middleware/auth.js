const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // 1. Look for the token in the "Authorization" header
    // Format is usually: "Bearer eyJhbGciOi..."
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // 2. If no token was sent, block them! (401 = Unauthorized)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Please log in.' });
    }

    // 3. Verify the token using our secret key
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Save the user info (id, username) on the request!
        next();             // ✅ Valid ticket! Let them pass!
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = auth;