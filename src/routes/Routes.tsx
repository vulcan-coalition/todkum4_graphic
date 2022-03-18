import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';
import { useAuth } from '../hooks/useAuth';
import MainPage from '../pages/Main';
import SelectBook from '../pages/SelectBook';
import SpeechToTextV3 from '../pages/SpeechToTextV3';
import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => {
    const { token, login } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                token: token,
                login: login
            }}
        >
            <BrowserRouter>
                <Suspense
                    fallback={
                        <div
                            style={{ alignItems: "center", justifyContent: "center" }}
                        >
                            <h2>กำลังโหลด โปรดรอสักครู่</h2>
                        </div>
                    }
                >
                    <Switch>
                        <PrivateRoute exact path="/selectbook">
                            <SelectBook />
                        </PrivateRoute>
                        <PrivateRoute exact path="/stt-v3">
                            <SpeechToTextV3 />
                        </PrivateRoute>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </AuthContext.Provider >
    );
}

export default Routes;
