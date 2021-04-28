const Router = require('express');
const router = new Router();
const {check} = require('express-validator');
const cvController = require('../controllers/cvController');

router.post(
  '/create',
  [check('first_name').isString()],
  [check('last_name').isString()],
  [check('current_position').isString()],
  [check('skills').isArray()],
  [check('projectActivities').isArray()],
  cvController.create
);
router.get('/get/all', cvController.getAll);
router.get('/get', cvController.get);
router.get('/create-pdf', cvController.createPdf);

module.exports = router;
