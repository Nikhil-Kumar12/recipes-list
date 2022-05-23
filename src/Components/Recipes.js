import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../CSS/Recipes.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipesCount, setRecipesCount] = useState();
  const [value, setValue] = useState("");
  const [page, setPagecount] = useState(1);

  const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "0", size: "40", tags: "under_30_minutes" },
    headers: {
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
      "X-RapidAPI-Key": "ebd2ce146dmsh4f4c43d346ba268p1ae632jsn76ed7a649d83",
    },
  };

  const handlePageClick = (data) => {
    setPagecount(data.selected + 1);
  };

  useEffect(() => {
    axios
      .request(options)
      .then((response) => {
        const data = response.data;
        setRecipesCount(data.results.length);
        setRecipes(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(recipes);
  console.log(recipesCount);

  return (
    <div className="main-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter the value ..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="recipes-container">
        {recipes
          ?.filter((val) => {
            if (value == "") {
              return val;
            } else {
              return val.name.toLowerCase().includes(value.toLowerCase());
            }
          })
          ?.slice((page - 1) * 8, page * 8)
          .map(({ name, thumbnail_url, created_at, id }) => {
            return (
              <div className="recipe" key={id}>
                <img src={thumbnail_url} alt="thumbnail" />
                <div className="details">
                  <span className="name">{name}</span>
                  <span className="creation-date">
                    {`${new Date(created_at).getDate()}-${
                      new Date(created_at).getMonth() + 1
                    }-${new Date(created_at).getFullYear()}`}
                  </span>
                </div>
              </div>
            );
          })}
        <ReactPaginate
          activeClassName="active"
          className="page-number"
          pageLinkClassName="button"
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={recipesCount / 8}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Recipes;
