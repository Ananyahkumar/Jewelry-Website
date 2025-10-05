import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your jewelry order has been received and is being processed.</p>
        <p>We appreciate your trust in us and hope you enjoy your new piece!</p>
        <Link to="/" style={{ marginTop: '2rem', display: 'inline-block', textDecoration: 'none', color: '#fff', background: '#bfa46d', padding: '0.75rem 2rem', borderRadius: '4px' }}>
            Back to Home
        </Link>
    </div>
);

export default Success;