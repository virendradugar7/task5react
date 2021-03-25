import React, { Component } from 'react';
import ReactDOM from 'react';
import Header from '../header/Header';
import styles from '../../bms.css';

import { Icon } from '@fluentui/react/lib/Icon';
import Gallery from './Gallery';
import HomepageSlider from './HomepageSlider';
import { Link } from 'react-router-dom';
import { MovieProvider } from '../../MovieContext';

export const Home = () => {

    return (
<>
<Header />
<Gallery />
        <div className="content">
            <div class="wrapper">
                <div class="wrapperinfo">
                    <h3>Recommended Movies</h3>
                    <h6>See all</h6>
                </div>
    
             <HomepageSlider />
           
            </div>
        </div>

</>
    );
}
export default Home