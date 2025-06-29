import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PreLoader from './frontendComponents/PreLoader';

const App = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleAnimationComplete = () => {
        setLoading(false);
        navigate('/home');
    };

    return (
        <div className="app-container">
            {loading ? (
                <PreLoader onAnimationComplete={handleAnimationComplete} />
            ) : (
                <Outlet />
            )}
        </div>
    );
};

export default App;
