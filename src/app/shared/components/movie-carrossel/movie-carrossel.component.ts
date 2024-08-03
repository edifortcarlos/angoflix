import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/video-content.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-carrossel',
  standalone: true,
  templateUrl: './movie-carrossel.component.html',
  styleUrl: './movie-carrossel.component.scss',
  imports: [CommonModule, DescriptionPipe, ImagePipe, RouterModule],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MovieCarrosselComponent implements AfterViewInit {
  @Input() videoContents: IVideoContent[] = []
  @Input() title!: string;
  @ViewChild('swiperContainer') swiperContainer!: ElementRef<HTMLDivElement>;

  selectedContent: string | null = null;
  swiper: Swiper | null = null;


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.swiper = this.initSwiper();
    }, 2000)
  }

  private initSwiper() {
      return new Swiper(this.swiperContainer?.nativeElement, {
        slidesPerView: 3,
        slidesPerGroup: 2,
        centeredSlides: true,
        loop: true,
        breakpoints: {
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 5,
            centeredSlides: true,
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1800: {
            slidesPerView: 5,
            slidesPerGroup: 6,
            spaceBetween: 5,
            centeredSlides: false,
          }
        }
      })
  }

  setHoverMovie(movie: IVideoContent) {
    this.selectedContent = movie.title ?? movie.name
  }

  clearHoverMovie(){
    this.selectedContent = null;
  }
}
