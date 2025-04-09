import { Recipe } from "../../types/recipe";
import './flipcard.css'
export default function FlipCard({ recipe, clickHandler }: { recipe: Recipe, clickHandler: (id: string) => void }) {
  return (
    <div className="recipe-card" onClick={() => clickHandler(recipe.id)}>
      <div className="recipe-card__image-container">
        <img src={recipe.image_url} alt={`imagen del ${recipe.title}`} className="recipe-card__image" />
      </div>
      <div className="recipe-card__content">
        <h2 className="recipe-card__title">{recipe.title}</h2>
        <div className="recipe-card__info">
          <p>Tiempo: 30 min | Porciones: 4</p>
          <div>
            <h4 className="">categorias:</h4>
            <ul className="flex mt-1 ">
              {recipe?.tag?.map((item) => (
                <li className="mx-1 font-semibold">{`# ${item}`}</li>
              ))}
            </ul>
          </div>
        </div>


      </div>
    </div>
  )
}