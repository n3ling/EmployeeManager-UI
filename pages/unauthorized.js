// pages/unauthorized.js

import React from 'react';
import { useRouter } from 'next/router';

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query; // Optional custom message from route

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Access Denied</h1>
            <p style={styles.message}>{message || 'You do not have permission to view this page.'}</p>
            <button style={styles.button} onClick={() => router.push('/')}>Go to Home</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        color: '#343a40',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
    },
    button: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
    },
};

export default Unauthorized;