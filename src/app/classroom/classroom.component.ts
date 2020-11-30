import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../services/classroom.service';
import { UtilsService } from '../services/utils.service';
import { ClassRoom } from '../_models/Classroom';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  classrooms: Array<ClassRoom> = [];

  constructor(
    private utilsService: UtilsService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit() {
    this.getClassrooms();
  }

  getClassrooms() {
    this.utilsService.updateShowPreloader(true);
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

}
