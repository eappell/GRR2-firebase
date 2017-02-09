import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  myInterval: number = 7000;

  constructor() { }

  ngOnInit() {
  }

  setupCarousel(): void {
    let $item = $('.carousel .item');
    let $wHeight = $(window).height();
    $item.eq(0).addClass('active');
    $item.height('400px');
    $item.addClass('full-screen');

    $('.carousel img').each(function() {
      let $src = $(this).attr('src');
      let $color = $(this).attr('data-color');
      $(this).parent().css({
        'background-image' : 'url(' + $src + ')',
        'background-color' : $color
      });
      $(this).remove();
    });

    $(window).on('resize', function (){
      $wHeight = $(window).height();
      $item.height($wHeight);
    });

    // $('.carousel').carousel({
    //   interval: 6000,
    //   pause: "false"
    // });
  }
}
