import "./Recipe.css";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router";
import React from "react";

export default function Recipe() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    "http://localhost:3000/recipes/" + id
  );

  return (
    <div className="recipe">
      {isPending && <h2>Loading Data...</h2>}
      {error && <h2>Error while fetching !!</h2>}
      {data && (
        <React.Fragment>
          <h2>{data.title}</h2>
          <p>{data.cookingTime} to cook</p>
          <ol>
            {data.ingredients.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ol>
          <p className="method">{data.method}</p>
        </React.Fragment>
      )}
    </div>
  );
}
