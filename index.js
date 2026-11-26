require('dotenv').config();

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/tasks', taskRoutes);

// 404 Catch-All
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔥 Server Error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
