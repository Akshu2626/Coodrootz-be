const express = require('express');
const { createRole, getRoles, deleteRole, updateRole, getRoleById } = require('../controllers/roleController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { updateIsAdmin } = require('../controllers/userController');

const router = express.Router();

router.post('/updateRole', authMiddleware, updateIsAdmin);
//role routes
router.post('/', authMiddleware, createRole);
router.get('/', authMiddleware, getRoles);
router.post('/getrolebyid', authMiddleware, getRoleById);
router.post('/deleteRole', authMiddleware, deleteRole);
router.put('/updateRole', authMiddleware, updateRole);




module.exports = router;
