import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private showPreloader = false;
  private _showPreloader = new BehaviorSubject(this.showPreloader);
  public showPreloader$: Observable<boolean> = this._showPreloader.asObservable();

  constructor() {}

  updateShowPreloader(val: boolean) {
    this.showPreloader = val;
    this._showPreloader.next(this.showPreloader);
  }
}
