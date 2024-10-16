const z = require('zod')

const movieSchema = z.object({
  Title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string().url(),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  Response: z.string(),
  Images: z.string().url().array()
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validateMovie, validatePartialMovie
}
