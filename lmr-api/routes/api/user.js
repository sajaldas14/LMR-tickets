var express = require('express');
var router = express.Router();
var db = require('../../db/lmrDb');


router.post('/login', (req, res) => {
    try {
        db.connect();

        const { username, password } = req.body;

        db.query('SELECT * FROM admin_login WHERE username = ?', [username], (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                const user = results[0];
                if (user.password === password) {
                    res.send({ result: user, status: true, message: "Login successful" });
                } else {
                    res.send({ status: false, message: "Invalid username or password" });
                }
            } else {
                res.send({ status: false, message: "User not found" });
            }
        });
        
    } catch (error) {

        throw error;
    } finally {
        db.end();
    }

});




module.exports = router;
