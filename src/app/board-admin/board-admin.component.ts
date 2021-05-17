import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  @ViewChild('tabGroup') group: any;

  constructor(private  router:Router) { }

  ngOnInit(): void {


  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {

    if(this.group.selectedIndex ===3) {

      this.router.navigate(['']);

    }

  }
}
