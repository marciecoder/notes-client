import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core'
import {UuidServant} from '../../../../util/uuid.servant'
import {NoteQuery, NoteStore} from '../../../../store/notes/note.store'
import {Subscription} from 'rxjs'
import {Note} from '../../../../store/notes/note'

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() id: string
  noteText: string
  textAreaId: string
  subscription: Subscription = new Subscription()
  note: Note = {
    active: false,
    body: '',
    id: '',
    lastUpdatedOn: 0,
    title: ''
  }

  constructor(private readonly uuidServant: UuidServant,
              private readonly noteQuery: NoteQuery,
              private readonly noteStore: NoteStore) {
    this.textAreaId = uuidServant.uuid()
  }

  ngOnInit(): void {
    this.subscription.add(this.noteQuery.selectEntity(this.id).subscribe((note) => {
      if (note === undefined) {
        return
      }
      this.note = note
      this.noteText = note.body
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onKeyUp(event) {
    this.noteStore.update(this.id, {...this.note, body: this.noteText})
  }

  onHeaderEditExit() {
    this.setFocus()
  }

  ngAfterViewInit(): void {
    this.setFocus()
  }

  private setFocus() {
    document.getElementById(this.textAreaId).focus()
  }
}
