const express = require('express');
const { getUsers, assignRole } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/assign-role', authMiddleware, assignRole);

module.exports = router;
