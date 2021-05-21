import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData, UserdataComponent} from '../userdata/userdata.component';

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.component.html',
})
export class DialogDataExampleDialog {

  constructor( public dialogRef: MatDialogRef<UserdataComponent>,
               @Inject(MAT_DIALOG_DATA) public data:DialogData) {


  }
  ok():void{
    this.data.hidden=false;

    this.dialogRef.close();

  }
}
