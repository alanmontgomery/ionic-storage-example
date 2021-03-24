import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import ViewMessage from './pages/ViewMessage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useEffect } from 'react';
import { createStore, get, set } from './data/IonicStorage';
import { getMessages } from './data/messages';

const App = () => {

	useEffect(() => {

		const setupStore = async () => {

			await createStore("AlansDB");
			const exists = await get("msgs");

			if (!exists) {
				
				const msgs = getMessages();
				set("msgs", msgs);
			}
		}

		setupStore();
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet>
					<Route path="/" exact={true}>
						<Redirect to="/home" />
					</Route>
					<Route path="/home" exact={true}>
						<Home />
					</Route>
					<Route path="/message/:id">
						<ViewMessage />
					</Route>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	);
}

export default App;
