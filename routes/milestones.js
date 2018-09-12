import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import Q from 'q'
import { db } from '../app';

var upload = multer();
var router = express.Router();

const pass = process.env.EMOMO_PASS

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


router.get('/', async function (req, res, next) {

});

module.exports = router;
