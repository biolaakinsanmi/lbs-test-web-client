import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, SubscriptionLike } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/_models/User';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('userId')))
    ).subscribe(
      (id) => {
        this.user.id = +id;
        this.findUser();
      }
    );
  }

  findUser() {
    this.userService.findUser(this.user.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.user = response;
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error')
          .then(
            () => {
              this.router.navigate(['/users']);
            }
          );
      }
    );
  }

  confirmDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser();
      }
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        Swal.fire(
          'Deleted!',
          `${this.user.firstName} ${this.user.lastName} has been deleted.`,
          'success'
        ).then(
          () => {
            this.router.navigate(['/users']);
          }
        );
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error')
          .then(
            () => {
              this.router.navigate(['/users']);
            }
          );
      }
    );
  }
}
