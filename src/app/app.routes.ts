import { ContactComponent } from './contact/contact.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './common/navbar/navbar.component';
import { JukeboxComponent } from './common/jukebox/jukebox.component';
import { MonstersOverviewComponent } from './monsters/monsters-overview/monsters-overview.component';
import { ArnyhalalComponent } from './monsters/arnyhalal/arnyhalal.component';
import { BajvernoComponent } from './monsters/bajverno/bajverno.component';
import { LelekroppantoComponent } from './monsters/lelekroppanto/lelekroppanto.component';
import { AdventuresOverviewComponent } from './adventures/adventures-overview/adventures-overview.component';
import { MelysivatagComponent } from './adventures/melysivatag/melysivatag.component';
import { CharactersOverviewComponent } from './characters/characters-overview/characters-overview.component';
import { ClassesOverviewComponent } from './classes/classes-overview/classes-overview.component';
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

export const routes: Routes = [
	{ path: '', redirectTo: '/monsters', pathMatch: 'full' },
	{ path: 'navbar', loadComponent: () => import('./common/navbar/navbar.component').then(m => m.NavbarComponent) },
	{ path: 'jukebox', loadComponent: () => import('./common/jukebox/jukebox.component').then(m => m.JukeboxComponent) },
	{
		path: 'monsters',
		component: MonstersOverviewComponent // Monsters főoldal
	},
	{
		path: 'monsters/arnyhalal',
		component: ArnyhalalComponent // Árnyhalál oldal közvetlenül elérhető
	},
	{
		path: 'monsters/bajverno',
		component: BajvernoComponent // Bajverno oldal közvetlenül elérhető
	},
	{
		path: 'monsters/lelekroppanto',
		component: LelekroppantoComponent // Lélekröppantó oldal közvetlenül elérhető
	},
	{
		path: 'adventures',
		component: AdventuresOverviewComponent // Adventures főoldal
	},
	{
		path: 'shortStories/mana-nyelo',
		component: ManaNyeloComponent // Mélysivatag oldal közvetlenül elérhető
	},
	{
		path: 'adventures/melysivatag',
		component: MelysivatagComponent // Mélysivatag oldal közvetlenül elérhető
	},
	{
		path: 'characters',
		component: CharactersOverviewComponent // Characters főoldal
	},
	{
		path: 'characters/gonis-tue',
		component: GonisTueComponent // Gonis Tue oldal közvetlenül elérhető
	},
	{
		path: 'characters/sasszemu-ahm-shere',
		component: SasszemuAhmShereComponent // Gonis Tue oldal közvetlenül elérhető
	},
	{
		path: 'characters/emphasis-del-tomorrow',
		component: EmphasisDelTomorrowComponent // Emphasis Del Tomorrow oldal közvetlenül elérhető
	},
	{
		path: 'characters/ermor-von-geladen',
		component: ErmorVonGeladenComponent // Ermor Von Geladen oldal közvetlenül elérhető
	},
	{
		path: 'characters/dharr-menudo-syrus',
		component: DharrMenudoSyrusComponent // Dharr Menudo Syrus oldal közvetlenül elérhető
	},
	{
		path: 'characters/ibeadra-veronika-teacea',
		component: IbeadraVeronikaTeaceaComponent // Ibeadra Veronika Teacea oldal közvetlenül elérhető
	},
	{
		path: 'classes',
		component: ClassesOverviewComponent, // Classes főoldal
	},
	{
		path: 'classes/warrior',
		component: WarriorComponent // Warrior oldal közvetlenül elérhető
	},
	{
		path: 'classes/priests',
		component: PriestsComponent // Priests főoldal
	},
	{
		path: 'classes/priests/ellana-fopapno',
		component: EllanafopapnoComponent // Ellana Főpapnő oldal közvetlenül elérhető
	},
	{
		path: 'classes/priests/ellana-pusztito',
		component: EllanapusztitoComponent // Ellana Pusztító oldal közvetlenül elérhető
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
