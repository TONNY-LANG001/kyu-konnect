import React, { useEffect } from 'react';

const SPLASH_DURATION = 4000; // 4 seconds

const Splash = ({ history }) => {
  useEffect(() => {
    // If using react-router v5
    const timeout = setTimeout(() => {
      if (history && history.push) {
        history.push('/home');
      } else {
        // fallback for react-router v6 or if no history is passed
        window.location.replace('/home');
      }
    }, SPLASH_DURATION);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        background: '#000', // fallback background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src="https://i.ibb.co/bRq52FbP/file-000000006e4861f795b72cd5a16d36c6.png"
        alt="Splash"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Splash;
