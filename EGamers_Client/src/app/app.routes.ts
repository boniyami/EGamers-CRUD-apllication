import { Routes } from '@angular/router';
import { PlayerList } from './components/player-list/player-list';
import { AddPlayer } from './components/add-player/add-player';

export const routes: Routes = [
  { path: 'player-list', component: PlayerList },
  { path: 'add-player', component: AddPlayer },
  { path: 'edit-player/:id', component: AddPlayer },
  { path: '', redirectTo: '/player-list', pathMatch: 'full' },
];
