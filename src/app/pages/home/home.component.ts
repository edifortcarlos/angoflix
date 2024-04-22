import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { HeaderComponent } from '../../core/components/header/header.component';
import { MovieCarrosselComponent } from '../../shared/components/movie-carrossel/movie-carrossel.component';
import { User } from '../../shared/models/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { MovieService } from '../../shared/services/movie.service';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { DescriptionPipe } from '../../shared/pipes/description.pipe';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarrosselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user!: User;
  authService = inject(AuthService);
  movieService = inject(MovieService)
  storage?: Storage;

  bannerDetail$ =  new Observable<any>();
  bannerVideo$ =  new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  //ratedMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upComingMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.storage = document.defaultView?.localStorage;
 
    
  }

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    // this.movieService.getRatedMovies(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ]

  ngOnInit(): void {
    if(this.storage){
      const localUser = JSON.parse(this.storage.getItem('loged-user')!) as User | null;
      if(localUser){
        this.user = {
          name: localUser.name,
          picture: localUser.picture,
          email: localUser.email
        }
      }
    }

    forkJoin(this.sources).pipe(
      map(([movies, tvShows, /*ratedMovies,*/ nowPlayingMovies, upComingMovies, popularMovies, topRated]) => {
        this.bannerDetail$ = this.movieService.getBannerDetail((movies as any).results[0].id);
        this.bannerVideo$ = this.movieService.getBannerVideo((movies as any).results[0].id);

        return {movies, tvShows, /*ratedMovies,*/ nowPlayingMovies, upComingMovies, popularMovies, topRated}
      })
    ).subscribe((res: any) => {
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      // this.ratedMovies = res.ratedMovies as IVideoContent[];
      this.nowPlayingMovies = res.nowPlayingMovies.results as IVideoContent[];
      this.upComingMovies = res.upComingMovies.results as IVideoContent[];
      this.popularMovies = res.popularMovies.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];
    })
  }


  signOut(){
    this.authService.signOut();
  }

}
