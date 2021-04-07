import { RoomImage } from './../clases/RoomImage';
import { ImageService } from './../_services/ImageService.service';
import { RoomDetails } from './../clases/RoomDetails';
import { ActivatedRoute } from '@angular/router';
import { RoomDetailsService } from './../_services/RoomDetailsService.service';
import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-roominfo',
  templateUrl: './roominfo.component.html',
  styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
  room!: RoomDetails[];
  images!: RoomImage[];
@Input()  checkin!: Date;
 @Input() checkout!: Date;
  constructor(private roomDetailsService:RoomDetailsService,private roomImageService:ImageService) {

   }

  ngOnInit(): void {


    this.roomDetailsService.getRoomInfo(this.checkin,this.checkout).subscribe(info=>{


      this.room=info;


    });
    this.roomImageService.getRoomImage().subscribe(image=>{
this.images=image;

    });

  }

}
