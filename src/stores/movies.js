import { defineStore } from 'pinia'
import { inject } from 'vue'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieGenres: [],
    tvGenres: [],
    sort_by: [
      {
        title: 'Popularity Descending',
        value: 'popularity.desc'
      },
      {
        title: 'Popularity Ascending',
        value: 'popularity.asc'
      },

      {
        title: 'Revenue Descending',
        value: 'revenue.desc'
      },
      {
        title: 'Revenue Ascending',
        value: 'revenue.asc'
      },
      {
        title: 'Vote Average Ascending',
        value: 'vote_average.asc'
      },
      {
        title: 'Vote Average Descending',
        value: 'vote_average.desc'
      },
      {
        title: 'Vote Count Ascending',
        value: 'vote_count.asc'
      },
      {
        title: 'Vote Count Descending',
        value: 'vote_count.desc'
      }
    ]
  }),

  actions: {
    async getmovieGenres() {
      const axiosInstance = inject('$axios')
      const response = await axiosInstance.get(`genre/movie/list`)
      this.movieGenres = response.data.genres
    },

    async getTvGenres() {
      const axiosInstance = inject('$axios')
      const response = await axiosInstance.get(`genre/tv/list`)
      this.tvGenres = response.data.genres
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
    },

    genreTvName(genreId) {
      return this.tvGenres
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
