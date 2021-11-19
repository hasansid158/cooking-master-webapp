import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { UseThemeContext } from "../../Hooks/UseThemeContext/useThemeContext";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [timeToCock, setTimeToCock] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);

  const { color } = UseThemeContext();

  const navigate = useNavigate();

  const ingredientEl = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      title,
      cookingTime: timeToCock + " minutes",
      method,
      ingredients: allIngredients,
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();

    const cleanIng = ingredient.trim();
    if (cleanIng && !allIngredients.includes(cleanIng)) {
      setAllIngredients((prevState) => [...prevState, cleanIng]);
    }
    console.log(allIngredients);
    setIngredient("");
    ingredientEl.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Add a new Recipe!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title: </span>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </label>

        <label>
          <span>Ingredients: </span>
          <div className="ingredients">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                setIngredient(e.target.value);
              }}
              ref={ingredientEl}
            />
            <button onClick={handleAddIngredient} style={{ background: color }}>
              Add
            </button>
          </div>
        </label>
        <p>{`Ingredients: ${allIngredients}`}</p>

        <label>
          <span>Time to cock: </span>
          <input
            type="number"
            value={timeToCock}
            onChange={(e) => {
              setTimeToCock(e.target.value);
            }}
            required
          />
        </label>

        <label>
          <span>Method: </span>
          <textarea
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            required
            rows="5"
          />
        </label>

        <button type="submit" style={{ background: color }}>
          Add Recipe
        </button>
      </form>
    </div>
  );
}
