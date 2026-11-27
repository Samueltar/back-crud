const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: 'all fields are required'});
        }

        const existinguser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

            if(existinguser){
                return res.status(400).json({message : 'email is already registered'});
            }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?,?,?)');

    const result = stmt.run(username, email, hashedPassword);
    res.status(201).json({message : 'user registered', userId: Number(result.lastInsertRowid)});

    }
    catch(error){
        res.status(500).json({message : 'error registering user', error: error.message});

    }

};

exports.login = (req, res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'email and password are required'});
        }
    
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if(!user){
            return res.status(400).json({message: 'INVALID EMAIL OR PASSWORD'});
        }

        const isMatch = bcrypt.compareSync(password, user.password);
           if(!isMatch){
            return res.status(400).json({message: 'email or password not correct'});
           }
        
           const token = jwt.sign(
            {id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '1d'});
            res.json({message: 'Login successful', token});
    }
    catch(error){
        res.status(500).json({message: 'ERROR LOGGING IN', error: error.message});
    }

};
   