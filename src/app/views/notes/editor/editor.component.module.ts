import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {EditorComponent} from './editor.component'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {NoteHeaderComponent} from './note-header/note-header.component'
import {NotePanelModule} from './note-panel/note-panel.module'

@NgModule({
  declarations: [
    EditorComponent,
    NoteHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NotePanelModule
  ],
  providers: [],
  bootstrap: [EditorComponent],
  exports: [
    EditorComponent
  ]
})
export class EditorModule {
}
