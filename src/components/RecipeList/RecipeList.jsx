import { Link } from "react-router-dom";
import { UseThemeContext } from "../../Hooks/UseThemeContext/useThemeContext";
import "./RecipeList.css";
import { projectFirestore } from "../../firebase/config";

export default function RecipeList({ recipes }) {
  const { color } = UseThemeContext();

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => {
        return (
          <div key={recipe.id} className="card">
            <h3>
              <span>{recipe.title}</span>{" "}
              <span
                onClick={() => {
                  handleClick(recipe.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </span>
            </h3>
            <p>{recipe.cookingTime} to cook</p>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipe/${recipe.id}`} style={{ background: color }}>
              Full Recipe
            </Link>
          </div>
        );
      })}
    </div>
  );
}
