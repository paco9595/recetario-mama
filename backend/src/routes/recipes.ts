import express from 'express'
import { createNewRecipe, getAllRecipes, getRecipe } from '../controllers/recipes';
// import { getTemplateImages } from '../controllers/templates';
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe)
router.post('/new', createNewRecipe)

export default router