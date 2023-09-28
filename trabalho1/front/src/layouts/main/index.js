import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import './style.css'

const isUserLoggedIn = () => {
    return localStorage.getItem('token') !== null;
};

function MainLayout({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserLoggedIn()) {
            navigate('/login');
        }
    }, [])

    return (
        <main className='main-container'>
            {children}
        </main>
    );
}
  
export default MainLayout;