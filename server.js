const express = require('express');
const app = express();
const PORT = 3000;

// Task 19.2
app.get('/', (req, res) => {
    res.send('Welcome to CommunityHub API');
});

app.get('/about', (req, res) => {
    res.send('CommunityHub - A community platform');
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Exercise 1: Response Methods
app.get('/text', (req, res) => {
    res.send('Plain text response');
});

app.get('/json', (req, res) => {
    res.json({ message: 'JSON response', success: true });
});

app.get('/error', (req, res) => {
    res.status(400).json({ error: 'Bad request' });
});

app.get('/new-page', (req, res) => {
    res.send('This is new page');
});

app.get('/old-page', (req, res) => {
    res.redirect('/new-page');
});

// Exercise 2: Route Parameters
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `Getting user ${userId}` });
});

app.get('/posts/:postId/comments/:commentId', (req, res) => {
    const { postId, commentId } = req.params;
    res.json({ postId, commentId });
});

// Exercise 3: Query Strings
app.get('/search', (req, res) => {
    const { q, limit = 10, page = 1 } = req.query;
    res.json({
        query: q,
        limit: parseInt(limit),
        page: parseInt(page)
    });
});

app.get('/posts', (req, res) => {
    const { category, sort = 'newest' } = req.query;
    res.json({
        message: 'Getting posts',
        filters: { category, sort }
    });
});

// 404 handler - always last
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
