import { Component, OnInit } from '@angular/core';import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Modal2Component } from 'src/app/modal2/modal2.component';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {
  constructor(public matDialog: MatDialog) { }

  openModal() {
    const dialogConfig = new MatDialogConfig();


    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
  openModal2() {
    const dialogConfig = new MatDialogConfig();


    dialogConfig.id = "modal2-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const modalDialog = this.matDialog.open(Modal2Component, dialogConfig);
  }
  openLogin(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'login-component';
    dialogConfig.height = '100%';
    dialogConfig.width = '50%';

    this.matDialog.open(LoginComponent, dialogConfig);
  }
}
