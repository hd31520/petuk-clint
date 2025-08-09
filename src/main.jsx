import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  RouterProvider,
} from "react-router";



import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

import router from './routes/Router.jsx';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <
    QueryClientProvider client = {
        queryClient
    } >
    <RouterProvider router={router} /></QueryClientProvider>
      
    </AuthProvider>

  </StrictMode>,
)
