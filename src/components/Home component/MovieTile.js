import React, { Component } from 'react';
import styles from '../bms.css';
import { Link } from 'react-router-dom';
const MovieTile = ({ props }) => {
console.log("hellofrom movietile")
    return (
        <Link style={{ color: 'black', textDecoration: 'none' }}
            to={`/theater/${props.name}`
               
}>
    <div className="widget">
        <p style={{    position:' relative',
    bottom: '-310px'}}>{props.name}</p>
    <img src={`${process.env.PUBLIC_URL}/${props.name}.jpg`} style={{marginTop:'-14%'}} alt="" />
    </div>
          </Link >
    );
}


export default MovieTile