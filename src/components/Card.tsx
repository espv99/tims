import React from 'react';

type CardProps = {
    title?: string;
    children: React.ReactNode;
    className?: string;
    /** Elemento opcional a la izquierda (icono, imagen, etc.) */
    leading?: React.ReactNode;
};

const cardBaseStyles =
    'mx-4 my-4 rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow p-6 max-w-5xl';
const cardTypographyStyles =
    '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h2]:text-black [&_h2]:dark:text-white [&_p]:text-sm [&_p]:md:text-base [&_p]:text-gray-700 [&_p]:dark:text-gray-300';

const Card: React.FC<CardProps> = ({ title, children, className = '', leading }) => {
    const content = (
        <>
            {title && <h2>{title}</h2>}
            {children}
        </>
    );

    return (
        <div
            className={`${cardBaseStyles} ${cardTypographyStyles} ${className}`}
        >
            {leading ? (
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{leading}</div>
                    <div className="min-w-0">{content}</div>
                </div>
            ) : (
                content
            )}
        </div>
    );
};

export default Card;