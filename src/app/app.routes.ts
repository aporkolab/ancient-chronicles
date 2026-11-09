import { Routes } from '@angular/router';

// A nyitólap azonnal betöltődik, a többi lap csak akkor, amikor odalépnek.
import { HomeComponent } from './home/home.component';

const SITE = 'Chronica Arcana';
const t = (page: string) => `${page} – ${SITE}`;

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: `${SITE} – M.A.G.U.S.-írások archívuma` },

	{ path: 'monsters', loadComponent: () => import('./monsters/monsters.component').then(m => m.MonstersComponent), title: t('Bestiárium') },
	{ path: 'monsters/arnyhalal', loadComponent: () => import('./monsters/arnyhalal/arnyhalal.component').then(m => m.ArnyhalalComponent), title: t('Árnyhalál') },
	{ path: 'monsters/bajverno', loadComponent: () => import('./monsters/bajverno/bajverno.component').then(m => m.BajvernoComponent), title: t('Bájvérnő') },
	{ path: 'monsters/lelekroppanto', loadComponent: () => import('./monsters/lelekroppanto/lelekroppanto.component').then(m => m.LelekroppantoComponent), title: t('Lélekroppantó') },

	{ path: 'adventures', loadComponent: () => import('./adventures/adventures.component').then(m => m.AdventuresComponent), title: t('Küldetések') },
	{ path: 'adventures/melysivatag', loadComponent: () => import('./adventures/melysivatag/melysivatag.component').then(m => m.MelysivatagComponent), title: t('A Mélysivatag Labirintusa') },

	{ path: 'shortStories', loadComponent: () => import('./shortstories/shortstories.component').then(m => m.ShortstoriesComponent), title: t('Novellák') },
	{ path: 'shortStories/mana-nyelo', loadComponent: () => import('./shortstories/mana-nyelo/mana-nyelo.component').then(m => m.ManaNyeloComponent), title: t('A mana-nyelő') },

	{ path: 'characters', loadComponent: () => import('./characters/characters.component').then(m => m.CharactersComponent), title: t('Hősök') },
	{ path: 'characters/gonis-tue', loadComponent: () => import('./characters/gonis-tue/gonis-tue.component').then(m => m.GonisTueComponent), title: t('Gonis Tue') },
	{ path: 'characters/sasszemu-ahm-shere', loadComponent: () => import('./characters/sasszemu-ahm-shere/sasszemu-ahm-shere.component').then(m => m.SasszemuAhmShereComponent), title: t('Sasszemű Ahm Shere') },
	{ path: 'characters/emphasis-del-tomorrow', loadComponent: () => import('./characters/emphasis-del-tomorrow/emphasis-del-tomorrow.component').then(m => m.EmphasisDelTomorrowComponent), title: t('Emphasis Del Tomorrow') },
	{ path: 'characters/ermor-von-geladen', loadComponent: () => import('./characters/ermor-von-geladen/ermor-von-geladen.component').then(m => m.ErmorVonGeladenComponent), title: t('Ermor von Geladen') },
	{ path: 'characters/dharr-menudo-syrus', loadComponent: () => import('./characters/dharr-menudo-syrus/dharr-menudo-syrus.component').then(m => m.DharrMenudoSyrusComponent), title: t('Dharr Menudo Syrus') },
	{ path: 'characters/ibeadra-veronika-teacea', loadComponent: () => import('./characters/ibeadra-veronika-teacea/ibeadra-veronika-teacea.component').then(m => m.IbeadraVeronikaTeaceaComponent), title: t('Ibeadra Veronika Teacea') },

	{ path: 'classes', loadComponent: () => import('./classes/classes.component').then(m => m.ClassesComponent), title: t('Kasztok') },
	// A „Harcosok” és „Papok” alcsoportnak nincs saját lapja: a kasztok áttekintő lapjára visz.
	{ path: 'classes/warrior', redirectTo: 'classes' },
	// A régi, többes számú útvonal megmarad, hogy a korábbi linkek és könyvjelzők működjenek.
	{ path: 'classes/warriors/hilvar', loadComponent: () => import('./classes/warrior/hilvar/hilvar.component').then(m => m.HilvarComponent), title: t('Hilvar') },
	{ path: 'classes/warrior/hilvar', redirectTo: 'classes/warriors/hilvar' },
	{ path: 'classes/priests', redirectTo: 'classes' },
	{ path: 'classes/priests/ellana-fopapno', loadComponent: () => import('./classes/priests/ellanafopapno/ellanafopapno.component').then(m => m.EllanafopapnoComponent), title: t('Ellana-főpapnő') },
	{ path: 'classes/priests/ellana-pusztito', loadComponent: () => import('./classes/priests/ellanapusztito/ellanapusztito.component').then(m => m.EllanapusztitoComponent), title: t('Ellana-pusztító') },

	{ path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent), title: t('Kapcsolatfelvétel') },

	// Ismeretlen cím: vissza a nyitólapra (GitHub Pagesen a 404.html is az alkalmazást tölti be).
	{ path: '**', redirectTo: '' }
];
