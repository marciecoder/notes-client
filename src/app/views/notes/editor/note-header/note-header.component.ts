import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {UuidServant} from '../../../../util/uuid.servant'
import {NoteQuery, NoteStore} from '../../../../store/notes/note.store'
import {Subscription} from 'rxjs'
import {Note} from '../../../../store/notes/note'

@Component({
  selector: 'app-note-header',
  templateUrl: './note-header.component.html',
  styleUrls: ['./note-header.component.css']
})
export class NoteHeaderComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  @Input() id: string
  @Output() editExit = new EventEmitter<string>()
  note: Note = {
    active: false,
    body: '',
    id: '',
    lastUpdatedOn: 0,
    title: ''
  }
  noteTitle = ''
  active = false
  editMode = false
  headerId: string
  textBoxId: string
  listener: (event) => any
  private setFocusToTextBox: boolean
  subscription: Subscription = new Subscription()

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly uuidServant: UuidServant,
              private readonly  noteStore: NoteStore,
              private readonly noteQuery: NoteQuery) {
    this.headerId = uuidServant.uuid()
    this.textBoxId = uuidServant.uuid()
    this.listener = (event) => {
      const thisHeaderClicked = document.getElementById(this.headerId).contains(event.toElement)
      if (thisHeaderClicked) {
        if (!this.editMode) {
          this.editMode = true
          this.setFocusToTextBox = true
        }
      } else {
        this.onExitEditMode()
      }
    }
  }

  ngAfterViewInit() {
    const textbox = document.getElementById(this.headerId)
    textbox.onmousedown = ((e) => {
      if (e.button === 1) {
        this.onClose()
      }
    })
  }

  ngAfterViewChecked(): void {
    if (this.setFocusToTextBox) {
      document.getElementById(this.textBoxId).focus()
      this.setFocusToTextBox = false
    }
  }

  ngOnInit() {
    this.subscribeToNote()
    this.subscribeToRoute()
    window.addEventListener('click', this.listener)
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.listener)
    this.subscription.unsubscribe()
  }

  private onExitEditMode() {
    this.saveNewName()
    this.editMode = false
    this.editExit.emit(this.id)
  }

  private saveNewName() {
    this.noteStore.update(this.id, {...this.note, title: this.noteTitle})
  }

  onCloseClicked() {
    this.onClose()
  }

  onKeyPressEvent(event) {
    const enterPressed = event.key === 13
    const escapePressed = event.key === 27
    const tabPressed = event.key === 9
    if (enterPressed || tabPressed) {
      this.onExitEditMode()
    } else if (escapePressed) {
      this.editMode = false
    }
  }

  handleBlur() {
    this.onExitEditMode()
  }

  handleOnClick(event) {
    if (this.editMode) {
      return
    }
    const thisHeaderClicked = document.getElementById(this.headerId).contains(event.toElement)
    if (event.button === 1) {
      this.onClose()
    } else if (event.button === 0 && !thisHeaderClicked) {
      this.onNavigate()
    }
  }

  private onNavigate() {
    this.router.navigate(['/notes'], {
      queryParams: {
        activeNotes: this.id,
        loadedNotes: this.activatedRoute.snapshot.queryParams.loadedNotes
      }
    })
  }

  private onClose() {
    const loadedNotes = this.activatedRoute.snapshot.queryParams.loadedNotes
    if (!loadedNotes) {
      // Not sure what happened but exit
      return
    }
    const split = loadedNotes.split(',')
    const index = split.indexOf(this.id)
    split.splice(index, 1)
    const newLoadedNotes = split.join(',')
    if (newLoadedNotes.length === 0) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/notes'], {
        queryParams: {
          activeNotes: split[0],
          loadedNotes: this.activatedRoute.snapshot.queryParams.loadedNotes
        }
      })
    }
  }

  private subscribeToNote() {
    this.subscription.add(this.noteQuery.selectEntity(this.id).subscribe((note: Note) => {
      this.note = note
      this.noteTitle = this.note.title
    }))
  }

  private subscribeToRoute() {
    this.subscription.add(this.activatedRoute.params.subscribe((parameters) => {
      const activeNoteId = parameters.activeNotes
      this.active = activeNoteId && activeNoteId === this.id
      if (!this.active) {
        this.editMode = false
      }
    }))
  }
}
