const Movie = require("../models/Movie");

const addMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre, image } = req.body;

    if (!title || !director || !year || !description || !genre) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const newMovie = new Movie({
      title: title,
      director: director,
      year: year,
      description: description,
      genre: genre,
      image
    });

    const savedMovie = await newMovie.save();
    return res.status(201).send(savedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to add movie, please try again." });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});

    const moviesWithComments = movies.map(movie => ({
      ...movie.toObject(),
      comments: movie.comments.map(c => ({
        _id: c._id,
        userId: c.userId,
        comment: c.comment
      }))
    }));

    return res.status(200).send({ movies: moviesWithComments });
  } catch (err) {
    console.error("Error in fetching movies:", err);
    return res.status(500).send({ error: "Failed to fetch movies" });
  }
};


const updateMovie = async (req, res) => {
  try {
    const { title, director, year, description, genre, image } = req.body;

    if (!title || !director || !year || !description || !genre) {
      return res.status(400).send({ error: "All fields are required." });
    }

    if (!req.params.id) {
      return res.status(400).send({ error: "Movie ID is required" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, director, year, description, genre, image },
      { new: true },
    );

    if (!updatedMovie)
      return res.status(404).send({ message: "Movie not found" });

    res.status(200).send({
      message: "Movie updated successfully",
      updatedMovie,
    });
  } catch (err) {
    console.error("Error in updating movie:", err);
    res.status(500).send({ error: "Error in updating movie" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: "Movie ID is required" });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
        return res.status(404).send({ message: "Movie not found" });
    }

    res.status(200).send({
      message: "Movie deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleting movie:", err);
    res.status(500).send({ error: "Error in deleting movie" });
  }
};

const getMovie = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({ error: "Movie ID is required" });
    }

    const movie = await Movie.findById(req.params.id)
    .populate('comments.userId', 'username');

    if (!movie) {
        return res.status(404).send({ message: "Movie not found" });
    }
    res.status(200).send(movie);

  } catch (err) {
    console.error("Error in fetching movies:", err);
    res.status(500).send({ error: "Failed to fetch movies" });
  }
};

module.exports = {
  addMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovie
};
