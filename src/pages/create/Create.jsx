import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [timeToCock, setTimeToCock] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);

  const { postRequest, data } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate("/");
  }, [data, navigate]);

  const ingredientEl = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    postRequest({
      title,
      cookingTime: timeToCock + " minutes",
      method,
      ingredients: allIngredients,
    });
    console.log(data);
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
            <button onClick={handleAddIngredient}>Add</button>
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

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
