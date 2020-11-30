import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, SubscriptionLike } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ClassRoom } from 'src/app/_models/Classroom';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  classroom: ClassRoom = new ClassRoom();

  classroomForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private router: Router,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('classroomId')))
    ).subscribe(
      (id) => {
        this.classroom.id = +id;
        this.initClassroomForm();
      }
    );
  }

  initClassroomForm(){
    this.classroomForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      description: new FormControl('')
    });

    this.getClassroom();
  }

  getClassroom() {
    this.classroomService.findClassroom(this.classroom.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.classroom = response;
        this.classroomForm.controls.name.setValue(this.classroom.name);
        this.classroomForm.controls.description.setValue(this.classroom.description);
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );
  }

  updateClassroom() {
    if (!this.classroomForm.valid){
      for (const i in this.classroomForm.controls) {
        if (this.classroomForm.controls[i]) {
          this.classroomForm.controls[i].markAsTouched();
        }
      }

      Swal.fire('Check important fields!', 'Form not filled correctly!', 'error');
      return;
    }

    const updatedClassroom: ClassRoom = new ClassRoom();

    updatedClassroom.id = this.classroom.id;
    updatedClassroom.name = this.classroomForm.controls.name.value;
    updatedClassroom.description = this.classroomForm.controls.description.value;

    this.classroomService.updateClassroom(updatedClassroom).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.classroom = response;

        Swal.fire('Classroom updated!', `${updatedClassroom.name} classroom has been updated!`, 'success')
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
