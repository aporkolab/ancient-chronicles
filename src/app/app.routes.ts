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
	{ path: '', redirectTo: '/monsters', pathMatch: 'full' },
	{ path: 'navbar', component: NavbarComponent },
	{ path: 'jukebox', component: JukeboxComponent },
	{
		path: 'monsters', component: MonstersComponent, children: [
			{ path: 'arnyhalal', component: ArnyhalalComponent },
			{ path: 'bajverno', component: BajvernoComponent },
			{ path: 'lelekroppanto', component: LelekroppantoComponent },
		]
	},
	{
		path: 'adventures', component: AdventuresComponent, children: [
			{ path: 'melysivatag', component: MelysivatagComponent },
		]
	},
	{ path: 'characters', component: CharactersComponent },
	{
		path: 'classes', component: ClassesComponent, children: [
			{ path: 'warrior', component: WarriorComponent },
			{
				path: 'priests', component: PriestsComponent, children: [
					{ path: 'ellana-fopapno', component: EllanafopapnoComponent },
					{ path: 'ellana-pusztito', component: EllanapusztitoComponent },
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
