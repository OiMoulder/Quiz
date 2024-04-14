import React from 'react';

function HoldingPage({ round }) {
  return (
    <div className="holding-page">
      <h1>Round {round} is over!</h1>
      <p>Get ready for the next round...</p>
      {/* Add any additional content or instructions here */}
    </div>
  );
}

export default HoldingPage;
