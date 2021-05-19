import { createContext, FC, useContext } from "react";
import {auth, firebase, googleProvider} from '../services/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
interface IUserContext {
    user: firebase.User | null | undefined,
    loading: boolean,
    error: firebase.auth.Error | undefined,
    login: () => void,
    logout: () => void
}

const UserContext = createContext<IUserContext>({
    user: null,
    loading: true,
    error: undefined,
    login: () => {},
    logout: () => {}
});

export const UserProvider: FC = ({children}) => {

    const [user, loading, error] = useAuthState(auth);

    const login = async () => {
        await auth.signInWithPopup(googleProvider);
    }
    const logout = async () => {
        await auth.signOut();
    }
    return (
        <UserContext.Provider value={{
            user,loading,error, login, logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);