import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { FormPage } from './FormPage';
import { Home } from './Home';
import TestFetch from './TestFetch';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<FormPage />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
