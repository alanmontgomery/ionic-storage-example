import MessageListItem from '../components/MessageListItem';
import { useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { get, set } from '../data/IonicStorage';
import { getMessages } from '../data/messages';

const Home = () => {

	const [messages, setMessages] = useState([]);

	useIonViewWillEnter(async() => {

		const exists = await get("msgs");

		if (!exists) {
			
			const msgs = getMessages();
			set("msgs", msgs);
			setMessages(msgs);
		} else {

			setMessages(exists);
		}
	});

	const refresh = (e) => {

		resetStore();
		setTimeout(() => {
			e.detail.complete();
		}, 1000);
	};

	const resetStore = async () => {

		const msgs = getMessages();
		set("msgs", msgs);
		setMessages(msgs);
	}

	return (
		<IonPage id="home-page">
			<IonHeader>
				<IonToolbar>
					<IonTitle>Inbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={refresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>

				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Inbox</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList>
					{ messages && messages.map(m => <MessageListItem key={m.id} message={m} />) }
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
