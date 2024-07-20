// src/App.js
import React, { Suspense, lazy } from 'react';
const TicketList = lazy(() => import('./components/Ticket/TicketList'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <TicketList />
      </Suspense>
    </div>
  );
}

export default App;
