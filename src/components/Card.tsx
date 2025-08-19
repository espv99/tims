import React from 'react';

type CardProps = {
    title?: string;
    children: React.ReactNode;
    className?: string;
};

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
    </div>
);

export default Card;