
import { ImageService } from './../_services/ImageService.service';
import { RoomDetails } from './../clases/RoomDetails';
import { RoomDetailsService } from './../_services/RoomDetailsService.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'app-roominfo',
    templateUrl: './roominfo.component.html',
    styleUrls: ['./roominfo.component.css']
})
export class RoominfoComponent implements OnInit {
    room !:RoomDetails[];



    @Input() checkin!: Date;
    @Input() checkout!: Date;

    constructor(private roomDetailsService: RoomDetailsService, private roomImageService: ImageService ) {

    }

    ngOnInit(): void {


        this.roomDetailsService.getRoomInfo(this.checkin, this.checkout).subscribe(info => {
            this.room = info;

            for (let i = 0; i < this.room.length; i++) this.roomImageService.getRoomImageById(this.room[i].roomid).subscribe(image => {

              this.room[i].images = image;

            });
        });


    }

}
