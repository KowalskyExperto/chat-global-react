import {firebase} from '../services/firebase'

export interface IMessage{
    id: string,
    text: string,
    uid: string,
    photoURL: string,
    displayName: string,
    createdAt: firebase.firestore.Timestamp,
    email: string
}