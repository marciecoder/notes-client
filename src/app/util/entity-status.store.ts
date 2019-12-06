import {ProcessingStatus} from './processing-status'
import {action, EntityState, EntityStore, OrArray, QueryEntity, StoreConfigOptions} from '@datorama/akita'
import {SetEntities} from '@datorama/akita/src/setEntities'

const getInitialStatusState = <E, ID>() =>
  ({
    status: ProcessingStatus.IDLE
  } as EntityStatusState<E, ID>)

export interface EntityStatusState<E, ID = any> extends EntityState<E> {
  status: ProcessingStatus
}

export class EntityStatusStore<
  E, ID = any, S extends EntityStatusState<E, ID> = EntityStatusState<E, ID>> extends EntityStore<S, E, ID> {

  constructor(initialState: Partial<S> = {}, protected options: Partial<StoreConfigOptions> = {}) {
    super({...getInitialStatusState<E, ID>(), ...initialState}, options)
  }

  @action('Start Loading')
  startLoading() {
    this.update((state) => ({...state, status: ProcessingStatus.UNDERWAY}))
  }

  @action('Set and Finish Loading')
  setAndFinishLoading(entities: SetEntities<E>) {
    this.update((state) => ({...state, status: ProcessingStatus.SUCCESS}))
  }

  @action('Add and Finish Loading')
  addAndFinishLoading(entities: OrArray<E>) {
    this.update((state) => ({...state, status: ProcessingStatus.SUCCESS}))
    this.add(entities)
  }

  @action('Fail Loading')
  failLoading() {
    this.update((state) => ({...state, status: ProcessingStatus.FAILURE}))
  }
}

export class QueryStatusEntity<
  E, ID = any, S extends EntityStatusState<E, ID> = EntityStatusState<E, ID>> extends QueryEntity<S, E, ID> {

  constructor(store: EntityStore<S, E, ID>) {
    super(store as any as EntityStore<S>)
  }

  selectStatus() {
    return this.select((state) => state.status)
  }
}
