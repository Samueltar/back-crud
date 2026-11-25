require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Regular middlewares
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 2. Application routes
app.use('/api/tasks', taskRoutes);

// 3. 404 Catch-All (ONLY runs if no route matched above!)
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// 4. Global Error Handler (At the very bottom)
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 5. Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});