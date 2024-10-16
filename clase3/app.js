const express = require('express')
const moviesJson = require('./movies.json')
const cors = require('cors')

const { validateMovie, validatePartialMovie } = require('./movies.js')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

app.get('/', (req, res) => {
  res.status(200).send('<h1>Home</h1>')
})

app.get('/movies', (req, res) => {
  res.json(moviesJson)
})

app.get('/movies-genre', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = moviesJson.filter(
      movie => movie.Genre.split(',').some(g => g.trim().toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }
})

app.get('/movies/:imdbID', (req, res) => {
  const { imdbID } = req.params
  const movie = moviesJson.find(movie => movie.imdbID === imdbID)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    Response,
    Images
  } = req.body
  const newMovie = {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    Response,
    Images
  }
  moviesJson.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:imdbID', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { imdbID } = req.params
  const movieIndex = moviesJson.findIndex(movie => movie.imdbID === imdbID)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...moviesJson[movieIndex],
    ...result.data
  }
  res.json(updateMovie)
})

app.use((req, res) => {
  res.status(404).send('<h1>404<h1/>')
})

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
