import { defineStore } from 'pinia'

import axios from 'axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieGenres: []
  }),

  actions: {
    async getmovieGenres() {
      const api_key = import.meta.env.VITE_APP_API_KEY
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
      )
      this.movieGenres = response.data.genres
    },
    genreTypeName(genreId) {
      return this.movieGenres
        .filter(function (genre) {
          return genreId.includes(genre.id)
        })
        .map(function (genre) {
          return genre.name
        })
        .join(', ')
    }
  }
})
