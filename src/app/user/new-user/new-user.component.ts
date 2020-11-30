import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ClassRoom } from 'src/app/_models/Classroom';
import { User } from 'src/app/_models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  user: User = new User();
  classrooms: Array<ClassRoom> = [];

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private utilsService: UtilsService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit() {
    this.initClassroomForm();
  }

  initClassroomForm() {
    this.userForm = this.formBuilder.group({
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      classroomId: new FormControl('')
    });

    this.getClassrooms();
  }

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.classrooms = response;
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );
  }


  createUser() {
    if (!this.userForm.valid) {
      for (const i in this.userForm.controls) {
        if (this.userForm.controls[i]) {
          this.userForm.controls[i].markAsTouched();
        }
      }

      Swal.fire('Check important fields!', 'Form not filled correctly!', 'error');
      return;
    }


    this.user.firstName = this.userForm.controls.firstName.value;
    this.user.lastName = this.userForm.controls.lastName.value;
    this.user.email = this.userForm.controls.email.value;
    this.user.classroomId = this.userForm.controls.classroomId.value;

    this.userService.createUser(this.user).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('User created!', `${this.user.firstName} classroom has been created!`, 'success')
          .then(
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
