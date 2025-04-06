import express from 'express'
import { createNewRecipe, getAllRecipes, getRecipe } from '../controllers/recipes';
import fileUpload from 'express-fileupload';
// import { getTemplateImages } from '../controllers/templates';
const router = express.Router();

router.get('/', getAllRecipes);

router.get('/:id', getRecipe)


router.post('/new', fileUpload({
  debug: true,
  createParentPath: true,
}), createNewRecipe)

export default router