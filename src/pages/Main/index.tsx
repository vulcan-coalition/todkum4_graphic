import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


interface MainPageProps { }

const MainPage: React.FC<MainPageProps> = () => {
    const history = useHistory();

    useEffect(() => {
        const params = new URLSearchParams(history.location.search)
        if (params.get('token') && params.get('refresh')) {
            history.push('/selectbook')
        }
    }, [history])

    return (
        <>
            <div style={{ padding: 10 }} >
                <span>Loading ..</span>
            </div>
        </>
    );
};

export default MainPage;