import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, SubscriptionLike } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { UtilsService } from 'src/app/services/utils.service';
import { switchMap } from 'rxjs/operators';
import { ClassRoom } from 'src/app/_models/Classroom';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-classroom',
  templateUrl: './view-classroom.component.html',
  styleUrls: ['./view-classroom.component.scss']
})
export class ViewClassroomComponent implements OnInit {

  paramsSubscription$: SubscriptionLike;
  classroom: ClassRoom = new ClassRoom();

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private classroomService: ClassroomService,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => of(params.get('classroomId')))
    ).subscribe(
      (id) => {
        this.classroom.id = +id;
        this.findClassroom();
      }
    );
  }

  findClassroom() {
    this.classroomService.findClassroom(this.classroom.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        this.classroom = response;
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
        this.deleteClassroom();
      }
    });
  }

  deleteClassroom() {
    this.classroomService.deleteClassroom(this.classroom.id).subscribe(
      (response: any) => {
        this.utilsService.updateShowPreloader(false);
        Swal.fire(
          'Deleted!',
          `${this.classroom.name} has been deleted.`,
          'success'
        ).then(
          () => {
            this.router.navigate(['/']);
          }
        );
      },
      (error: any) => {
        this.utilsService.updateShowPreloader(false);

        Swal.fire('Sorry!', `${error.error.message}`, 'error');
      }
    );
  }

}
