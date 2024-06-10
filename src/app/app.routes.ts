import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { JukeboxComponent } from './common/jukebox/jukebox.component';
import { MonstersComponent } from './monsters/monsters.component';
import { ArnyhalalComponent } from './monsters/arnyhalal/arnyhalal.component';
import { BajvernoComponent } from './monsters/bajverno/bajverno.component';
import { LelekroppantoComponent } from './monsters/lelekroppanto/lelekroppanto.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { MelysivatagComponent } from './adventures/melysivatag/melysivatag.component';
import { CharactersComponent } from './characters/characters.component';
import { ClassesComponent } from './classes/classes.component';
import { WarriorComponent } from './classes/warrior/warrior.component';
import { PriestsComponent } from './classes/priests/priests.component';
import { EllanafopapnoComponent } from './classes/priests/ellanafopapno/ellanafopapno.component';
import { EllanapusztitoComponent } from './classes/priests/ellanapusztito/ellanapusztito.component';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
	{ path: 'navbar', loadComponent: () => import('./common/navbar/navbar.component').then(m => m.NavbarComponent) },
	{ path: 'jukebox', loadComponent: () => import('./common/jukebox/jukebox.component').then(m => m.JukeboxComponent) },
	{
		path: 'monsters', loadComponent: () => import('./monsters/monsters.component').then(m => m.MonstersComponent), children: [
			{ path: 'arnyhalal', loadComponent: () => import('./monsters/arnyhalal/arnyhalal.component').then(m => m.ArnyhalalComponent) },
			{ path: 'bajverno', loadComponent: () => import('./monsters/bajverno/bajverno.component').then(m => m.BajvernoComponent) },
			{ path: 'lelekroppanto', loadComponent: () => import('./monsters/lelekroppanto/lelekroppanto.component').then(m => m.LelekroppantoComponent) },
		]
	},
	{
		path: 'adventures', loadComponent: () => import('./adventures/adventures.component').then(m => m.AdventuresComponent), children: [
			{ path: 'melysivatag', loadComponent: () => import('./adventures/melysivatag/melysivatag.component').then(m => m.MelysivatagComponent) },
		]
	},
	{ path: 'characters', loadComponent: () => import('./characters/characters.component').then(m => m.CharactersComponent) },
	{
		path: 'classes', loadComponent: () => import('./classes/classes.component').then(m => m.ClassesComponent), children: [
			{ path: 'warrior', loadComponent: () => import('./classes/warrior/warrior.component').then(m => m.WarriorComponent) },
			{
				path: 'priests', loadComponent: () => import('./classes/priests/priests.component').then(m => m.PriestsComponent), children: [
					{ path: 'ellana-fopapno', loadComponent: () => import('./classes/priests/ellanafopapno/ellanafopapno.component').then(m => m.EllanafopapnoComponent) },
					{ path: 'ellana-pusztito', loadComponent: () => import('./classes/priests/ellanapusztito/ellanapusztito.component').then(m => m.EllanapusztitoComponent) },
				]
			},
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
