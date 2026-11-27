const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');
const auth = require('../middleware/auth')
router.use(auth)

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

