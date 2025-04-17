import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { FormPage } from './FormPage';
import { Home } from './Home';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<FormPage />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
