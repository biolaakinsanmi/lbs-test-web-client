import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy {
  title = 'lbsTestWebClient';

  showPreloader = false;
  private showPreloader$: SubscriptionLike;

  constructor(
    private utilsService: UtilsService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.showPreloader$ = this.utilsService.showPreloader$.subscribe(
      (val) => {
        this.showPreloader = val;
      }
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    if(this.showPreloader$) { this.showPreloader$.unsubscribe(); }
  }
}
