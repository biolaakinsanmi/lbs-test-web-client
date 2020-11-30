import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClassRoom } from '../_models/Classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(
    private http: HttpClient
  ) { }

  isProcessing: boolean = null;
  _isProcessing: BehaviorSubject<boolean> = new BehaviorSubject(this.isProcessing);
  isProcessing$: Observable<boolean> = this._isProcessing.asObservable();

  getClassrooms() {
    this.updateIsProcessing(true);
    return this.http.get(`${environment.apiBaseUrl}/classrooms`);
  }

  createClassroom(classroom: ClassRoom) {
    this.updateIsProcessing(true);
    return this.http.post(`${environment.apiBaseUrl}/classrooms`, classroom);
  }

  updateClassroom(classroom: ClassRoom) {
    this.updateIsProcessing(true);
    return this.http.put(`${environment.apiBaseUrl}/classrooms/${classroom.id}`, classroom);
  }

  findClassroom(classroomId: number) {
    this.updateIsProcessing(true);
    return this.http.get(`${environment.apiBaseUrl}/classrooms/${classroomId}`);
  }

  deleteClassroom(classroomId: number) {
    this.updateIsProcessing(true);
    return this.http.delete(`${environment.apiBaseUrl}/classrooms/${classroomId}`);
  }

  updateIsProcessing(val: boolean) {
    this.isProcessing = val;
    this._isProcessing.next(this.isProcessing);
  }
}
