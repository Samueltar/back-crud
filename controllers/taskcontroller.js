const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, '../tasks.json');

async function getTasks() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveTasks(tasks) {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error reading tasks', error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const tasks = await getTasks();
        const taskId = parseInt(req.params.id);
        const task = tasks.find(t => t.id === taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task', error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        if (!req.body.title || req.body.title.trim() === '') {
            return res.status(400).json({ message: 'Title is required' });
        }
        const tasks = await getTasks();
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            title: req.body.title.trim(),
            completed: Boolean(req.body.completed)
        };
        tasks.push(newTask);
        await saveTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const tasks = await getTasks();
        const taskId = parseInt(req.params.id);
        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (req.body.title !== undefined) {
            task.title = req.body.title.trim();
        }
        if (req.body.completed !== undefined) {
            task.completed = Boolean(req.body.completed);
        }
        await saveTasks(tasks);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const tasks = await getTasks();
        const taskId = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const deletedTask = tasks.splice(taskIndex, 1);
        await saveTasks(tasks);
        res.json({ message: 'Task deleted successfully', task: deletedTask[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};
