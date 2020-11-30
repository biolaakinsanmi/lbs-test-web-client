import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../_models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: Array<User> = [];

  constructor(
    private utilsService: UtilsService,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.utilsService.updateShowPreloader(true);
    this.usersService.getUsers().subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.users = response;
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );

  }

}
