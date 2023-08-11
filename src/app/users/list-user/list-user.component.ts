import { Component } from '@angular/core';
import {Student} from "../../interfaces/student";
import {StudentsService} from "../../services/students.service";
import {User} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  public usersList: User[] = [];
  public pageSize = 0;
  public totalRecods = 0;
  public loader = false;

  constructor(private usersService: UsersService) {}

  public getAllUsers(event?: any) {
    this.loader = true;
    const pageSize = event ? event.rows : 10;
    this.pageSize = pageSize;
    const page = event ? event.first / pageSize : 0;
    this.usersService.getAllUsers(page, pageSize)
      .subscribe({
        next: (res) => {
          this.usersList = res.content;
          this.totalRecods = res.totalElements;
          this.loader = false;
        }
      })
  }

}
