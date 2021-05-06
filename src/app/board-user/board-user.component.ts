import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {UserData} from "../clases/UserData";
import {UserdataComponent} from "../userdata/userdata.component";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent  {
  mobileQuery: MediaQueryList;




  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public matDialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

  }

  viewuserdata():void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "user-data";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const modalDialog = this.matDialog.open(UserdataComponent, dialogConfig);
  }
  }

