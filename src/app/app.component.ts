import {Component, OnInit, ViewContainerRef} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  lastUrlPathKey = 'last-url-path'

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly viewContainerReference: ViewContainerRef) {

  }
  ngOnInit(): void {
    // TODO navigate to last loaded path
  }

  changeOfRoutes() {
    // TODO store the last set path
  }
}
