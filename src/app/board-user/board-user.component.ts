import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user!: string;
constructor(private tokenStorage:TokenStorageService){

}
  ngOnInit(): void {
  this.user=this.tokenStorage.getUsername();

}

}
