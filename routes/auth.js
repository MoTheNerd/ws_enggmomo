import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import 'babel-polyfill';

var upload = multer();
var router = express.Router();

const pass = process.env.EMOMO_PASS

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post('/login', upload.array(), function (req, res, next) {
    res.send(login(req.body));
});


function login(ppass) {
    //simple pass check
    if (ppass.pass == pass) {
        return {
            success: true,
            pass: pass
        }
    }
}

module.exports = router;