import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { useNavigate, useParams } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const navigate = useNavigate();

  // TMDB API -------------------------

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGIzOTI0NjZiMDQ5NjI5NjEzN2NhMmQ2MzIyYjYwYSIsIm5iZiI6MTczNDY5NTQ0Ny4xNDYsInN1YiI6IjY3NjU1YTE3ZjkyNmJlMDNjYzc0OThlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RtwEr7x8D7EZGtPEsSbAxOBqsduydG7F9auLz4BJr3M",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <div
              onClick={() => navigate(`/player/${card.id}`)}
              className="card"
              key={index}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
