const express = require('express');
const router = express.Router();
const controllers=require('./controllers');

router.get('/mail/user/:email',controllers.getUser)
router.get('/mail/send',controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/', controllers.readMail);
router.get('/mail/readFirstMail', controllers.readFirstMail)

module.exports = router;