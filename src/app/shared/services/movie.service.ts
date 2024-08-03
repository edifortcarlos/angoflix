import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment.dev';

const options = {
    params: {
        include_adult: 'false',
        include_video: 'true',
        language: 'en-US',
        page: '1',
        sort_by: 'popularity.desc',
    },

    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${environment.tmdb_api_key}`
    }
}

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    http = inject(HttpClient);

    getMovies(){
        return this.http.get(`${environment.tmdb_base_url}/discover/movie`, options)
    }

    getTvShows() {
        return this.http.get(`${environment.tmdb_base_url}/discover/tv`, options)
      }
    
      getRatedMovies() {
        return this.http.get(`${environment.tmdb_base_url}/guest_session/guest_session_id/rated/movies`, options)
      }
    
      getBannerImage(id: number) {
        return this.http.get(`${environment.tmdb_base_url}/movie/${id}/images`, options)
      }
    
      getBannerVideo(id: number) {
        return this.http.get(`${environment.tmdb_base_url}/movie/${id}/videos`, options);
      }
    
      getMovieDetail(id: number) {
        return this.http.get(`${environment.tmdb_base_url}/movie/${id}`, options);
      }
    
      getNowPlayingMovies() {
        return this.http.get(`${environment.tmdb_base_url}/movie/now_playing`, options)
      }
    
      getPopularMovies() {
        return this.http.get(`${environment.tmdb_base_url}/movie/popular`, options)
      }
    
      getTopRated() {
        return this.http.get(`${environment.tmdb_base_url}/movie/top_rated`, options)
      }
    
      getUpcomingMovies() {
        return this.http.get(`${environment.tmdb_base_url}/movie/upcoming`, options)
      }
}