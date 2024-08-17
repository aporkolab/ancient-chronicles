import { CharactersComponent } from './characters/characters.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './common/navbar/navbar.component';
import { JukeboxComponent } from './common/jukebox/jukebox.component';
import { ArnyhalalComponent } from './monsters/arnyhalal/arnyhalal.component';
import { BajvernoComponent } from './monsters/bajverno/bajverno.component';
import { LelekroppantoComponent } from './monsters/lelekroppanto/lelekroppanto.component';
import { MelysivatagComponent } from './adventures/melysivatag/melysivatag.component';
import { WarriorComponent } from './classes/warrior/warrior.component';
import { PriestsComponent } from './classes/priests/priests.component';
import { EllanafopapnoComponent } from './classes/priests/ellanafopapno/ellanafopapno.component';
import { EllanapusztitoComponent } from './classes/priests/ellanapusztito/ellanapusztito.component';
import { HilvarComponent } from './classes/warrior/hilvar/hilvar.component';
import { GonisTueComponent } from './characters/gonis-tue/gonis-tue.component';
import { EmphasisDelTomorrowComponent } from './characters/emphasis-del-tomorrow/emphasis-del-tomorrow.component';
import { ErmorVonGeladenComponent } from './characters/ermor-von-geladen/ermor-von-geladen.component';
import { DharrMenudoSyrusComponent } from './characters/dharr-menudo-syrus/dharr-menudo-syrus.component';
import { IbeadraVeronikaTeaceaComponent } from './characters/ibeadra-veronika-teacea/ibeadra-veronika-teacea.component';
import { SasszemuAhmShereComponent } from './characters/sasszemu-ahm-shere/sasszemu-ahm-shere.component';
import { ManaNyeloComponent } from './shortstories/mana-nyelo/mana-nyelo.component';
import { HomeComponent } from './home/home.component';
import { MonstersComponent } from './monsters/monsters.component';
import { AdventuresComponent } from './adventures/adventures.component';
import { ClassesComponent } from './classes/classes.component';
import { ShortstoriesComponent } from './shortstories/shortstories.component';

export const routes: Routes = [
	{ path: 'navbar', loadComponent: () => import('./common/navbar/navbar.component').then(m => m.NavbarComponent) },
	{ path: 'jukebox', loadComponent: () => import('./common/jukebox/jukebox.component').then(m => m.JukeboxComponent) },
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'monsters',
		component: MonstersComponent
	},
	{
		path: 'monsters/arnyhalal',
		component: ArnyhalalComponent
	},
	{
		path: 'monsters/bajverno',
		component: BajvernoComponent
	},
	{
		path: 'monsters/lelekroppanto',
		component: LelekroppantoComponent
	},
	{
		path: 'adventures',
		component: AdventuresComponent
	},
	{
		path: 'shortStories',
		component: ShortstoriesComponent
	},
	{
		path: 'shortStories/mana-nyelo',
		component: ManaNyeloComponent
	},
	{
		path: 'adventures/melysivatag',
		component: MelysivatagComponent
	},
	{
		path: 'characters',
		component: CharactersComponent
	},
	{
		path: 'characters/gonis-tue',
		component: GonisTueComponent
	},
	{
		path: 'characters/sasszemu-ahm-shere',
		component: SasszemuAhmShereComponent
	},
	{
		path: 'characters/emphasis-del-tomorrow',
		component: EmphasisDelTomorrowComponent
	},
	{
		path: 'characters/ermor-von-geladen',
		component: ErmorVonGeladenComponent
	},
	{
		path: 'characters/dharr-menudo-syrus',
		component: DharrMenudoSyrusComponent
	},
	{
		path: 'characters/ibeadra-veronika-teacea',
		component: IbeadraVeronikaTeaceaComponent
	},
	{
		path: 'classes',
		component: ClassesComponent,
	},
	{
		path: 'classes/warrior',
		component: WarriorComponent
	},
	{
		path: 'classes/priests',
		component: PriestsComponent
	},
	{
		path: 'classes/priests/ellana-fopapno',
		component: EllanafopapnoComponent
	},
	{
		path: 'classes/priests/ellana-pusztito',
		component: EllanapusztitoComponent
	},
	{
		path: 'classes/warriors/hilvar',
		component: HilvarComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		anchorScrolling: 'enabled',
		onSameUrlNavigation: 'reload',
		scrollPositionRestoration: 'enabled'
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
