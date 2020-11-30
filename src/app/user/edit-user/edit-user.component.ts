import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, SubscriptionLike } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/services/user.service';
import { ClassRoom } from 'src/app/_models/Classroom';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  user: User = new User();
  classrooms: Array<ClassRoom> = [];

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('userId')))
    ).subscribe(
      (id) => {
        this.user.id = +id;
        this.initClassroomForm();
      }
    );
  }

  initClassroomForm() {
    this.userForm = this.formBuilder.group({
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      classroomId: new FormControl('')
    });

    this.getClassrooms();
  }

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe(
      (response: any) => {
        this.classrooms = response;
        this.getUser();
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );
  }

  getUser() {
    this.userService.findUser(this.user.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.user = response;
        this.userForm.controls.firstName.setValue(this.user.firstName);
        this.userForm.controls.lastName.setValue(this.user.lastName);
        this.userForm.controls.email.setValue(this.user.email);
        if (this.user.Classroom) {
          this.userForm.controls.classroomId.setValue(this.user.classroomId);
        }
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );
  }

  updateUser() {
    if (!this.userForm.valid) {
      for (const i in this.userForm.controls) {
        if (this.userForm.controls[i]) {
          this.userForm.controls[i].markAsTouched();
        }
      }

      Swal.fire('Check important fields!', 'Form not filled correctly!', 'error');
      return;
    }

    const updatedUser: User = new User();

    updatedUser.id = this.user.id;
    updatedUser.firstName = this.userForm.controls.firstName.value;
    updatedUser.lastName = this.userForm.controls.lastName.value;
    updatedUser.email = this.userForm.controls.email.value;
    updatedUser.classroomId = this.userForm.controls.classroomId.value;

    this.userService.updateUser(updatedUser).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('User updated!', `${updatedUser.firstName} classroom has been updated!`, 'success')
          .then(
            () => {
              this.router.navigate(['/users/view', this.user.id]);
            }
          );
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error')
          .then(
            () => {
              this.router.navigate(['/']);
            }
          );
      }
    );
  }
}
