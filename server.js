const express = require('express');
const cors = require('cors'); // Add this
const app = express();
const PORT = 5500; // Updated port

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors()); // Add this

// Serve static files (like your HTML file)
app.use(express.static(__dirname));

// Endpoint to handle the form submission
app.post('/api/get-recommendations', (req, res) => {
    const { interests } = req.body;

    // Simple recommendations based on interests
    const recommendations = {
        'logo-designing': 'Learn graphic design principles and software.',
        'content-writing': 'Build your writing portfolio by starting a blog or writing articles.',
        'digital-marketing': 'Learn SEO, SEM, and social media marketing.',
        'comic-writing': 'Explore comic creation tools and storytelling techniques.',
        'ui-ux': 'Study user interface and user experience design principles.',
        'photography': 'Practice photography techniques and software for editing.',
        'copywriter': 'Focus on crafting compelling copy for various media.',
        'online-tutoring': 'Explore tools and strategies for effective online tutoring.'
    };

    // Generate recommendations based on the selected interests
    const selectedRecommendations = interests.map(interest => ({
        title: interest.replace(/-/g, ' ').toUpperCase(),
        description: recommendations[interest] || 'Explore more areas to find your interest!'
    }));

    // Send the recommendation back as a response
    res.json({ recommendations: selectedRecommendations });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
