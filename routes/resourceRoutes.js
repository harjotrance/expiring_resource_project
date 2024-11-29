const express = require('express');
const router = express.Router();
const { createResource, getResources, getResource, deleteResource, getResourceWithToken, generateAuthToken } = require('../controllers/resourceController');
const authMiddleware = require('../middlewares/authMiddleware');

// POST /resources - Create a new resource (with expiration time)
router.post('/resources', authMiddleware, createResource);

// GET /resources - Fetch all resources for the logged-in user
// Optional query parameters: ?status=active or ?status=expired
router.get('/resources', authMiddleware, getResources);

// GET /resources/:id - Access a specific resource (if active)
router.get('/resources/:id', authMiddleware, getResource);

// DELETE /resources/:id - Delete a resource (only by the owner)
router.delete('/resources/:id', authMiddleware, deleteResource);

// Post /token - to generate a token for a resource ( only for authenticating users)
// use name and email in body to generate token (excluded password since it was not part of the requirement)
router.post('/token', generateAuthToken );

module.exports = router;
