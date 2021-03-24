import { IonItem, IonLabel, IonNote } from '@ionic/react';
import { getContacts } from '../data/contacts';
import './MessageListItem.css';

const MessageListItem = ({ message }) => {

	const contacts = getContacts();

	return (
		<IonItem routerLink={`/message/${message.id}`} detail={false}>
			<div slot="start" className="dot dot-unread"></div>
			<IonLabel className="ion-text-wrap">
				<h2>
					{ contacts.filter(c => parseInt(c.id) === parseInt(message.fromId))[0].name }
					<span className="date">
						<IonNote>{message.date}</IonNote>
					</span>
				</h2>
				<h3>{message.subject}</h3>
				<p>{message.body}</p>
			</IonLabel>
		</IonItem>
	);
};

export default MessageListItem;
