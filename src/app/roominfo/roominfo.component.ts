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
@Input()  checkin!: Date;
 @Input() checkout!: Date;
  constructor(private roomDetailsService:RoomDetailsService,private route:ActivatedRoute) {

   }

  ngOnInit(): void {


    this.roomDetailsService.getRoomInfo(this.checkin,this.checkout).subscribe(info=>{


      this.room=info;


    });

  }

}
``
