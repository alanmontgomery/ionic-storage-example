import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonPage, IonSelect, IonSelectOption, IonTextarea, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { checkmarkSharp, personCircle, trashOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import './ViewMessage.css';

import { getObject, setObject, removeObject } from '../data/IonicStorage';
import { getContacts } from '../data/contacts';

function ViewMessage() {

	const [message, setMessage] = useState();
	const [showToast, setShowToast] = useState({ show: false, message: "", color: "" });
	const contacts = getContacts();
	const params = useParams();
	const history = useHistory();

	useIonViewWillEnter(async () => {
		
		const msg = await getObject("msgs", params.id);
		setMessage(msg);
	});

  	const saveEmail = async () => {

		await setObject("msgs", params.id, message);
		setShowToast({ show: true, message: "Email has been saved.", color: "primary" });
  	}

	const removeEmail = async () => {

		await removeObject("msgs", params.id);
		setShowToast({ show: true, message: "Email has been removed.", color: "danger" });
		history.goBack();
  	}

  	const handleChange = (key, val) => {

		setMessage({ ...message, [key]: val });
  	}

  	return (
    	<IonPage id="view-message-page">
      		<IonHeader translucent>
        		<IonToolbar>
          			<IonButtons>
            			<IonBackButton text="Inbox" defaultHref="/home"></IonBackButton>
          			</IonButtons>

          			<IonButtons slot="end">

			  			<IonButton onClick={ removeEmail }>
							<IonIcon icon={ trashOutline } color="danger" />
						</IonButton>
            			<IonButton onClick={ saveEmail }>
              				<IonIcon icon={ checkmarkSharp } />
            			</IonButton>
					</IonButtons>
        		</IonToolbar>
      		</IonHeader>

      		<IonContent fullscreen>
        		{message ? (
          			<>
            			<IonItem>
              				<IonIcon icon={personCircle} color="primary"></IonIcon>
              				<IonLabel className="ion-text-wrap">
                				<IonItem lines="none">

                  					<IonLabel>From:</IonLabel>
                  					<IonSelect value={ message.fromId } onIonChange={ e => handleChange("fromId", parseInt(e.currentTarget.value)) }>
										{ contacts.map((contact, index) => {
											return <IonSelectOption key={ index } value={ contact.id }>{ contact.name }</IonSelectOption>
										})}
                  					</IonSelect>
                				</IonItem>
								<span className="date">
									<IonNote>{message.date}</IonNote>
								</span>
								<h3>To: Me</h3>
              				</IonLabel>
            			</IonItem>

            			<div className="ion-padding">

							<IonItem lines="full">
								<IonLabel position="floating">Subject</IonLabel>
								<IonInput placeholder="Email subject..." value={ message.subject } onKeyUp={ e => handleChange("subject", e.currentTarget.value) } style={{ fontSize: "1.5rem", fontWeight: "400" }} />
							</IonItem>

							<br />
              
							<IonItem lines="full">
								<IonLabel position="floating">Body</IonLabel>
								<IonTextarea placeholder="Enter email body..." rows="8" className="ion-text-wrap" value={ message.body } onIonChange={ e => handleChange("body", e.target.value) } />
							</IonItem>
            			</div>
          			</>
        		) : (
          			<div>Message not found</div>
        		)}
      		</IonContent>

      		<IonToast isOpen={ showToast.show } onDidDismiss={ () => setShowToast({ show: false, message: "" }) } message={ showToast.message } duration={ 2000 } color={ showToast.color } />
    	</IonPage>
  	);
}

export default ViewMessage;
