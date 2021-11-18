import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import RecipeList from "../../components/RecipeList/RecipeList";
import useFetch from "../../Hooks/useFetch";
import "./Search.css";

export default function Search() {
  const params = useLocation().search;
  const filteredParams = new URLSearchParams(params).get("q");

  const { data, isPending, error } = useFetch(
    "http://localhost:3000/recipes/?q=" + filteredParams
  );

  const navigate = useRef(useNavigate());

  useEffect(() => {
    if (filteredParams === "") {
      navigate.current("/");
    }
  }, [filteredParams, navigate]);

  return (
    <div className="search">
      {isPending ? (
        <h2>Loading data...</h2>
      ) : (
        <h2>
          {data && data.length > 0
            ? `Recipes that includes "${filteredParams}"`
            : `No results with "${filteredParams}"`}
        </h2>
      )}
      {error && <h2>Error while fetching data!</h2>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
