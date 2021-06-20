import {Component, Inject, OnInit} from '@angular/core';
import {ImageService} from '../_services/ImageService.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RoomImage} from '../clases/RoomImage';
import {MatSnackBar} from '@angular/material/snack-bar';


export  interface ViewImages {
  roomid:number
}
@Component({
  selector: 'app-view-room-images',
  templateUrl: './view-room-images.component.html',
  styleUrls: ['./view-room-images.component.css']
})
export class ViewRoomImagesComponent implements OnInit {


  constructor(public matSnackbar: MatSnackBar, public  imageService: ImageService, @Inject(MAT_DIALOG_DATA) public data: ViewImages, public dialogRef: MatDialogRef<ViewRoomImagesComponent>, public dialog: MatDialog) {
  }
display:boolean=false;
images:RoomImage[]=[];
imageSrc:string[]=[];
  ngOnInit(): void {
this.imageService.getRoomImageById(this.data.roomid).subscribe(images=>{
  this.images=images;
})
  }


  close() {
    this.dialogRef.close();
  }
}
