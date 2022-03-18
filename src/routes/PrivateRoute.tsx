import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';

interface PrivateRouteProps extends RouteProps { }

const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { children, location, ...rest } = props;
    const { token } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={() =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;