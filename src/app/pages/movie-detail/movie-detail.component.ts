import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { AuthService } from '../../shared/services/auth.service';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  authService = inject(AuthService);
  movieService = inject(MovieService);
  route = inject(ActivatedRoute);

  movieInfo?: IVideoContent;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe(params => {
      this.movieService.getMovieDetail(params['id']).subscribe((data) => {
        this.movieInfo = data as IVideoContent;

        console.log(this.movieInfo)
      });
    })
  }

  toggleVideo() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
    video.paused ? video.play() : video.pause();
  }

}
