const Router = require('express');
const router = new Router();
const cvRouter = require('./cvRouter');

router.use('/cv', cvRouter);

module.exports = router;
