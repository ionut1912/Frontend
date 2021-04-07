import { RoomImage } from './../clases/RoomImage';
import { ImageService } from './../_services/ImageService.service';
import { RoomDetails } from './../clases/RoomDetails';
import { ActivatedRoute } from '@angular/router';
import { RoomDetailsService } from './../_services/RoomDetailsService.service';
import { Component, OnInit, Input } from '@angular/core';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';




@Component({
  selector: 'app-roominfo',
  templateUrl: './roominfo.component.html',
  styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
  room!: RoomDetails[];
  id!: number[];
  images!:RoomImage[];

@Input()  checkin!: Date;
 @Input() checkout!: Date;
  constructor(private roomDetailsService:RoomDetailsService,private roomImageService:ImageService) {

   }

  ngOnInit(): void {


    this.roomDetailsService.getRoomInfo(this.checkin,this.checkout).subscribe(info=>{
      this.room=info;
      
      this.id=this.room.map(a=>a.roomid);
        for(let i=0;i<this.id.length;i++)
      {this.roomImageService.getRoomImageById(this.id[i]).subscribe(image=>{
      this.images=image;
      });
      
        }
    });


  }
}
