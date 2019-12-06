import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {UuidServant} from '../../../util/uuid.servant'
import {Note} from '../../../store/notes/note'
import {NoteStore} from '../../../store/notes/note.store'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  loadedNoteIds: string[]
  activeNoteId: string

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly uuidServant: UuidServant,
              private readonly noteStore: NoteStore) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe((parameters) => {
      this.activeNoteId = parameters.activeNotes
      if (parameters.loadedNotes) {
        this.loadedNoteIds = parameters.loadedNotes.split(',')
      }
      if (!this.activeNoteId) {
        this.createAndNavigateToNewNote()
        return
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private createAndNavigateToNewNote() {
    const id: string = this.uuidServant.uuid()
    const note: Note = {
      id,
      title: 'Note',
      body: '',
      lastUpdatedOn: new Date().getTime()
    }
    this.noteStore.add(note)
    this.router.navigate(['/notes'], {
      queryParams: {
        activeNotes: id,
        loadedNotes: id
      },
      replaceUrl: true
    })
  }
}
