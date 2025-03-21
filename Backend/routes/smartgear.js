const express = require('express');
const router = express.Router();
const smartgearcontroller = require('../controller/Controller');

router.get('/', smartgearcontroller.getSmartgears);
router.get('/:id', smartgearcontroller.viewSmartgear);
module.exports = router;
