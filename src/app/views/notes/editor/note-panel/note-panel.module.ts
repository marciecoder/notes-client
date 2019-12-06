import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {NotePanelComponent} from './note-panel.component'

@NgModule({
    declarations: [
        NotePanelComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [NotePanelComponent],
    exports: [
        NotePanelComponent
    ]
})
export class NotePanelModule {
}
