import express from 'express'
import { createNewRecipe, getAllRecipes, getRecipe } from '../controllers/recipes';
// import { getTemplateImages } from '../controllers/templates';
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:userId/:id', getRecipe)
router.post('/:userId/new', createNewRecipe)

export default router