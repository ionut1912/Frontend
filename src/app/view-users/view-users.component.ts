import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Users} from '../clases/Users';
import {UserService} from '../_services/UserService.service';
import {MatDialog} from '@angular/material/dialog';


import {EditUser} from '../edit-user/edit-user.component';
import {DeleteUser} from '../delete-user/delete-user.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit, AfterViewInit {
  columns: string[] = ['userid', 'name', 'email', 'username', 'type', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public  formBuilder: FormBuilder, public  userService: UserService, public  dialog: MatDialog, public  matSnackBar: MatSnackBar) {
    this.search = this.formBuilder.group({
      userid: [''],
      name: [''],
      email: [''],
      username: [''],
      role: [''],


    });
  }

  public dataSource = new MatTableDataSource<Users>();
  users: Users[] = [];
  usersById: Users[] = [];
  usersByName: Users[] = [];
  usersByEmail: Users[] = [];
  usersByUsername: Users[] = [];
  usersByRole: Users[] = [];
  form: any = {
    userid: null,
    name: null,
    email: null,
    username: null,
    role: null

  };
  search!: FormGroup;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.userService.getAllUsers().subscribe(userInfo => {
      this.users = userInfo;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }


  edit(userid: number, name: string, email: string, username: string, type: string) {
    const dialogRef = this.dialog.open(EditUser, {
      data: {
        userid: userid,
        name: name,
        email: email,
        username: username,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(info => {
      this.ngAfterViewInit();
    });
  }

  delete(userid: number) {
    const dialogRef = this.dialog.open(DeleteUser, {
      data: {
        userid: userid
      }
    });
    dialogRef.afterClosed().subscribe(info => {
      this.ngAfterViewInit();
    });
  }

  searchByUserId() {
    this.usersById = this.users.filter(x => x.userid == this.form.userid);
    if (this.usersById.length == 0) {
      this.matSnackBar.open("Utilizatorul cu id-ul " + `${this.form.userid}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Utilizatorul cu id-ul " + `${this.form.userid}` + "  a fost gasit", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.usersById);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator
    }
  }

  searchByName() {
    if (this.usersById.length > 0) {
      this.usersByName = this.usersById.filter(x => x.name == this.form.name);
    } else {
      this.usersByName = this.users.filter(x => x.name == this.form.name);
    }
    if (this.usersByName.length == 0) {
      this.matSnackBar.open("Utilizatorul cu numele " + `${this.form.name}` + " nu exista", "Inchide", {
        duration: 3000
      });
    } else {
      this.matSnackBar.open("Utilizatorul cu numele " + `${this.form.name}` + " a fost gasit", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.usersByName);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

  }

  searchByEmail() {
    if (this.usersById.length > 0) {
      this.usersByEmail = this.usersById.filter(x => x.email == this.form.email);
    } else if (this.usersByName.length > 0) {
      this.usersByEmail = this.usersByName.filter(x => x.email == this.form.email);
    } else {
      this.usersByEmail = this.users.filter(x => x.email == this.form.email);
    }
    if (this.usersByEmail.length == 0) {
      this.matSnackBar.open("Utilizatorul cu email-ul " + `${this.form.email}` + " nu exista", "Inchide", {
        duration: 3000
      });

    } else {
      this.matSnackBar.open("Utilizatorul cu email-ul " + `${this.form.email}` + " a fost gasit", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.usersByEmail);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  searchByUsername() {
    if (this.usersById.length > 0) {
      this.usersByUsername = this.usersById.filter(x => x.username == this.form.username);
    } else if (this.usersByName.length > 0) {
      this.usersByUsername = this.usersByName.filter(x => x.username == this.form.username);
    } else if (this.usersByEmail.length > 0) {
      this.usersByUsername = this.usersByEmail.filter(x => x.username == this.form.username);
    } else {
      this.usersByUsername = this.users.filter(x => x.username == this.form.username);
    }
    if (this.usersByUsername.length == 0) {
      this.matSnackBar.open("Utilizatorul cu username-ul " + `${this.form.username}` + " nu exista", "Inchide", {
        duration: 3000
      });

    } else {
      this.matSnackBar.open("Utilizatorul cu username-ul " + `${this.form.username}` + " a fost gasit", "Inchide", {
        duration: 3000
      });
      this.dataSource = new MatTableDataSource(this.usersByUsername);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator

    }
  }

  }

