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
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{ path: 'navbar', loadComponent: () => import('./common/navbar/navbar.component').then(m => m.NavbarComponent) },
	{ path: 'jukebox', loadComponent: () => import('./common/jukebox/jukebox.component').then(m => m.JukeboxComponent) },
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'monsters',
		component: MonstersOverviewComponent
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
		component: AdventuresOverviewComponent
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
		component: CharactersOverviewComponent
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
		component: ClassesOverviewComponent,
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
