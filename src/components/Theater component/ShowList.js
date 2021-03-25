import React, { Component, useContext, useState } from 'react';
import styles from '../../bms.css';
import Shows from './Shows';
import '@fluentui/react/dist/css/fabric.min.css';


const ShowList = ({ props }) => {
    const obj = props;
    const moviename=obj[0].name;
    const theaterList = obj[0].theater;
    
    console.log(obj);
    return (
        theaterList.map(theater => (
            <div className="infowrapper">
                <div className="theatreinfo" >
                    <h5>{theater.cinema}</h5>
                </div>
               <Shows props={theater} moviename={moviename} /> 
            </div>
        )

        )
    );

}
export default ShowList