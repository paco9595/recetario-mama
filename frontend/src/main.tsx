import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import RecipePage from './pages/recipe.tsx';
import HomePage from './pages/home.tsx';
import NewRecipePage from './pages/newRecipe.tsx';
import EditRecipePage from './pages/editRecipe.tsx';
import Login from './pages/login.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import Main from './pages/main.tsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const App = () => {
  return (

      <ClerkProvider publishableKey={PUBLISHABLE_KEY} signInFallbackRedirectUrl="/home" signUpFallbackRedirectUrl='/home' >
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<Main />}  />
            <Route path="/login" element={<Login />}  />
            <Route path="/home" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/recipe/new" element={<NewRecipePage />} />
            <Route path="/recipe/edit/:id" element={<EditRecipePage />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
  )



}

createRoot(document.getElementById('root')!).render(<App />)
