// SucessFull.js

import React, { useEffect } from 'react';
import './SucessFull.css'; // Import the CSS file

const SucessFull = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const successText = document.querySelector('.success-text');
            if (successText) {
                successText.classList.add('fade-out');
            }
        }, 3000); // Adjust the timeout duration as needed
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="success-container">
            <h1 className="success-text">Thanks For Shopping</h1>
        </div>
    );
}

export default SucessFull;
