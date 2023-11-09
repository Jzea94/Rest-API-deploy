const z = require('zod') // <--- librería de validación de esquemas en JavaScript

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: z.number().min(0).max(10).default(5)
})

function validateMovie (input) {
  return movieSchema.safeParse(input) // <-- safeParse ??
  // La función safeParse es utilizada para realizar la validación
  // si el objeto input cumple todas las validaciones del esquema,
  // se devuelve el objeto valido. Si no cumple, retorna un objeto
  // que contiene los errores de validación
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
  // partial: hace que todas las propiedades del objeto a validar sean opcionales.
  // En otras palabras, si alguna propiedad falta en el objeto input, no generará
  // un error de validación. Esto es util cuando se quiere validar objetos parciales
  // o cuando no todas las propiedades son requeridas.

  // Example: si en el body de la request no me pasan la propiedad title esto no va a
  // generar un error de validación debido que es opcional. caso contrario ocurre con
  // la función validateMovie
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
