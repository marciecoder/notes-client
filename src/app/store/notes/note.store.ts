import {Note} from './note'
import {EntityStatusState, EntityStatusStore, QueryStatusEntity} from '../../util/entity-status.store'
import {Injectable} from '@angular/core'
import {StoreConfig} from '@datorama/akita'

export interface NoteState extends EntityStatusState<Note, string> {

}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'notes'})
export class NoteStore extends EntityStatusStore<Note, string, NoteState> {

}

@Injectable({providedIn: 'root'})
export class NoteQuery extends QueryStatusEntity<Note, string, NoteState> {

  constructor(noteStore: NoteStore) {
    super(noteStore)
  }
}
