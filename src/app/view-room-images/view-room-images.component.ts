import {Component, Inject, OnInit} from '@angular/core';
import {ImageService} from '../_services/ImageService.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ViewRoomsComponent} from '../view-rooms/view-rooms.component';
import {RoomImage} from '../clases/RoomImage';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';

export  interface ViewImages {
  roomid:number
}
@Component({
  selector: 'app-view-room-images',
  templateUrl: './view-room-images.component.html',
  styleUrls: ['./view-room-images.component.css']
})
export class ViewRoomImagesComponent implements OnInit {
  private selectedFiles!:File;

  constructor(public  imageService:ImageService,@Inject(MAT_DIALOG_DATA) public data:ViewImages, public dialogRef: MatDialogRef<ViewRoomsComponent>,public dialog:MatDialog){ }
display:boolean=false;
images:RoomImage[]=[];
imageSrc:string[]=[];
  ngOnInit(): void {
this.imageService.getRoomImageById(this.data.roomid).subscribe(images=>{
  this.images=images;
})
  }

  editImage(imageid: number) {
    if (!this.display)
      this.display = true;
    else
      this.display = false;

    this.imageService.modifyImage(imageid, <RoomImage> {
      imagepath: this.imageSrc
    }).subscribe(() => {


    });
  }

  selectFiles({event}: { event: any }) {
    this.selectedFiles = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!this.selectedFiles.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(this.selectedFiles);
  }
  _handleReaderLoaded(e: { target: any; }) {
    let reader = e.target;
    this.imageSrc.push(reader.result);

  }


}
