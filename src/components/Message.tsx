
import { useUser } from '../context/user';
import {IMessage} from '../models/message'
import { NewLineText } from './NewLineText';

export const Message = ({message:m}:{message:IMessage}) => {
    const {user} = useUser();
    const fecha:Date = m.createdAt?.toDate() || undefined;
    return (
        <div key={m.id} className={(user?.email===m.email) ? "message same-user": "message"}>
            <img src={m.photoURL} alt={m.displayName} className="profile-image"/>
            <div className="text">
                {(user?.email===m.email) ? "" : <b>{m.displayName}</b>} {m.text.split('_nL').map( s=> <NewLineText texto={s} key={s}/>)}
                {(fecha) ? <small>Enviado {fecha.getHours()}:{fecha.getMinutes()}:{fecha.getSeconds()} {fecha.getDay()}/{fecha.getDate()}/{fecha.getFullYear()}</small> : "Enviado: " }
            </div>
        </div>
    )
}
