import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {HomeComponent} from './views/home/home.component'
import {EditorComponent} from './views/notes/editor/editor.component'
import {NotFoundComponent} from './views/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'settings', component: SettingsComponent},
  {path: 'notes', component: EditorComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
