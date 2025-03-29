import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import RecipePage from './pages/recipe.tsx';
import HomePage from './pages/home.tsx';
import NewRecipePage from './pages/newRecipe.tsx';
import EditRecipePage from './pages/editRecipe.tsx';
import Login from './pages/login.tsx';

const App = ()=> {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/recipe/new" element={<NewRecipePage />} />
      <Route path="/recipe/edit/:id" element={<EditRecipePage />} />
    </Routes>
  </BrowserRouter>
  )



}

createRoot(document.getElementById('root')!).render(<App/>)
