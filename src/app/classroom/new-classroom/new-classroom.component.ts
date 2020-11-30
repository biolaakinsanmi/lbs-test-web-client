import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ClassRoom } from 'src/app/_models/Classroom';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-classroom',
  templateUrl: './new-classroom.component.html',
  styleUrls: ['./new-classroom.component.scss']
})
export class NewClassroomComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  classroom: ClassRoom = new ClassRoom();

  classroomForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.initClassroomForm();
  }

  initClassroomForm(){
    this.classroomForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      description: new FormControl('')
    });

  }

  createClassroom() {
    if (!this.classroomForm.valid) {
      for (const i in this.classroomForm.controls) {
        if (this.classroomForm.controls[i]) {
          this.classroomForm.controls[i].markAsTouched();
        }
      }

      Swal.fire('Check important fields!', 'Form not filled correctly!', 'error');
      return;
    }

    this.classroom.name = this.classroomForm.controls.name.value;
    this.classroom.description = this.classroomForm.controls.description.value;

    this.classroomService.createClassroom(this.classroom).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Classroom created!', `${this.classroom.name} classroom has been updated!`, 'success')
          .then(
            () => {
              this.router.navigate(['/']);
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
