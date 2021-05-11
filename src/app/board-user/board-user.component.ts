import {MediaMatcher} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {UserData} from "../clases/UserData";
import {UserdataComponent} from "../userdata/userdata.component";
import {Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit
{
  @ViewChild('tabGroup') group: any;
constructor(private  router:Router){

}

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {

    if(this.group.selectedIndex == 4) {

      this.router.navigate(['']);

    }

  }


  ngOnInit(): void {


  }
  }

