import { Component, OnInit } from '@angular/core';

@Component({

  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  selector: 'app-video'

})
export class VideoComponent implements OnInit {
  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}
