import React from 'react';

const Preloader: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <svg className="ace-card-svg" viewBox="0 0 220 320">
                {/* 1. Borda da Carta */}
                <rect x="10" y="10" width="200" height="300" rx="15" ry="15" className="draw-path card-border" />

                {/* 2. O Coração Central Grande */}
                <path d="M110,230 C110,230 40,160 40,110 C40,70 75,60 92.5,80 C101.25,90 110,110 110,110 C110,110 118.75,90 127.5,80 C145,60 180,70 180,110 C180,160 110,230 110,230 Z" className="draw-path card-heart-big" />

                {/* 3. Canto Superior Esquerdo */}
                <g className="card-corner" transform="translate(25, 45)">
                    <text x="0" y="0" fontFamily="'Playfair Display', serif" fontSize="32" fontWeight="bold" textAnchor="middle">A</text>
                    <path d="M0,20 C0,20 -10,10 -10,2 C-10,-5 -2,-5 0,0 C2,-5 10,-5 10,2 C10,10 0,20 0,20 Z" transform="translate(0, 5)" />
                </g>

                {/* 4. Canto Inferior Direito */}
                <g className="card-corner" transform="translate(195, 275) rotate(180)">
                    <text x="0" y="0" fontFamily="'Playfair Display', serif" fontSize="32" fontWeight="bold" textAnchor="middle">A</text>
                    <path d="M0,20 C0,20 -10,10 -10,2 C-10,-5 -2,-5 0,0 C2,-5 10,-5 10,2 C10,10 0,20 0,20 Z" transform="translate(0, 5)" />
                </g>
            </svg>
            <div className="loading-text">Embaralhando</div>
        </div>
    );
};

export default Preloader;
