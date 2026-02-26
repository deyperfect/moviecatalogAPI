const express = require('express');
const movieController = require('../controllers/movieController');
const commentController = require('../controllers/commentController')
const router = express.Router()
const { verifyToken } = require('../middleware/verifyToken')
const { verifyAdmin } = require('../middleware/verifyAdmin')
    
router.post('/addMovie', verifyToken, verifyAdmin, movieController.addMovie);
router.get('/getMovies', movieController.getMovies)
router.patch('/updateMovie/:id', verifyToken, verifyAdmin, movieController.updateMovie)
router.delete('/deleteMovie/:id', verifyToken, verifyAdmin, movieController.deleteMovie)
router.get('/getMovie/:id', movieController.getMovie)
router.patch('/addComment/:id', verifyToken, commentController.addComment)
router.get('/getComments/:id', verifyToken, commentController.getComments)

module.exports = router;