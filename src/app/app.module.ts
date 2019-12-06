import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'
import {EditorModule} from './views/notes/editor/editor.component.module'
import {NotFoundComponent} from './views/not-found/not-found.component'
import {HomeModule} from './views/home/home.module'

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    HomeModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
