import React, { useState, useContext } from 'react';
import { MovieContext } from './MovieContext';


const MovieList = () => {
      let value = useContext(MovieContext);
      const [movies,setMovies]=value;
      console.log(movies);
   
    return (
     
            movies.map(movie => (
            <div className="recmov">
                <MovieTile props={movie} />
            </div>

        ))
    


    );
}
export default MovieList;