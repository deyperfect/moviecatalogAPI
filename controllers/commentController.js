const Movie = require('../models/Movie');

const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id;

    if (!comment) {
      return res.status(400).send({ error: "Comment should not be blank" });
    }

    if (!req.params.id) {
      return res.status(400).send({ error: "Movie ID is required" });
    }

    const username = req.user.username; 

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { userId, username, comment } } },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).send({ error: "Movie not found" });
    }

    return res.status(201).send({
      message: "Comment added successfully",
      updatedMovie
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Failed to add comment, please try again." });
  }
};

const getComments = async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!movieId) {
      return res.status(400).send({ error: "Movie ID is required" });
    }

    const movie = await Movie.findById(movieId, { comments: 1 })
    .populate('comments.userId', 'username');

    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }

    return res.status(200).send({ comments: movie.comments });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res.status(500).send({ error: "Failed to fetch comments" });
  }
};


module.exports = { 
    addComment,
    getComments
};