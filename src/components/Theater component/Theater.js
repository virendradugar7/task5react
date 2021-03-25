import React, { useContext, useEffect, useState } from 'react';
import styles from '../../bms.css';
import { MovieContext } from '../../MovieContext';
import { useParams } from 'react-router-dom';
import ShowList from './ShowList';
import Header from '../header/Header';
import PriceRange from './PriceRange';
import TimeRange from './TimeRange';
import StaticJson from '../../StaticJSON'
import '@fluentui/react/dist/css/fabric.min.css';

var clone;
const Theater = ({ props }) => {

    const priceList = StaticJson().mainList;
    const timeList=StaticJson().timeList;
    console.log(priceList);
    // const [filterIsOpen, setfilter] = useState(false);

    const [movies,setMovies] = useContext(MovieContext);

    let { movie } = useParams();
 
 

    clone = movies.filter(m => {
        return m.name == movie
    });
    //console.log(value);
    const [clone2,setcl]=useState(clone);

    console.log("initial clone",clone2);
    const [obj, setobj] = useState(clone);

    var [priceFilter, setpriceFilter] = useState([""]);
    var [timeFilter, settimeFilter] = useState([""]);

    // const [refresh, setRefresh] = useState(0)

    useEffect(() => {

        //Normal Datastructure
        let t1;
        let subCline;
        subCline = clone;
        console.log("arraycheck", clone);
       
      
        if ( priceFilter.length==0 && timeFilter.length == 0) {
           
            setobj(clone2);
            console.log(clone2, "zzzzz")
        }
        else {
            var newobj=[{}];
            var theaters = [];
          
            let theaterList = subCline[0].theater;
            console.log(theaterList);
           theaterList.map((theater) => {
            let element={};
                let bool = false
                var showTimes = theater.timing;
                var price = theater.price;
                var cn = theater.classname;
                var showid=theater.id;
                cn = cn.filter((c) => {
                    let index=0;
                    let inc = false;
                    if (priceFilter.length != 0) {
                        priceFilter.forEach((i) => {
                            if (c.includes(i)) {
                                inc = true;
                                bool = true;
                            
                            }
                        })
                    }
                    if (timeFilter.length!= 0) {
                        timeFilter.forEach((i) => {
                            if (c.includes(i)) {
                                inc = true;
                                bool = true;
                                console.log(inc);
                            }
                        })
                    }
                    console.log(c, inc);
                   if(!inc){           
                    showTimes = showTimes.filter(function (st, i) {
                                    return i == index;
                                })
                                price = price.filter(function (st, i) {
                                    return i == index;
                                })
                                showid = showid.filter(function (st, i) {
                                    return i == index;
                                })
                   }
                     index++;
                    return inc;
                })

                 if(bool){
                     element.cinema=theater.cinema;
                     element.classname=cn;
                     element.price=price;
                     element.timing=showTimes;
                     element.id=showid;
                    theaters.push(element);
                 }

            })
            newobj[0].name=movie;
            newobj[0].theater=theaters;
            console.log(newobj, "vvv");
            setobj(newobj)
            console.log(newobj,"conrextcheck");
        }
    }, [priceFilter,timeFilter])


    return (
        <div>
         <Header />
            <section className="movieinfo lightbg">
                <div className="leftmovieinfo">
                    <h1 className="ms-fontColor-white" id="moviename">{movie}</h1>
                    <div className="tags">
                        <div className="ua">UA</div>
                        <i className="ms-Icon ms-Icon--HeartFill ms-fontColor-red ms-fontSize-l"></i>
                        <h5 className="ms-fontColor-white">69%</h5>
                        <div className="genre">
                            <h6>ACTION</h6>
                        </div>
                        <div className="genre">
                            <h6>THRILLER</h6>
                        </div>
                        <h5 className="ms-fontColor-white">Feb 26,2021 </h5>
                        <i className="ms-Icon ms-Icon--Clock ms-fontColor-white"></i>
                        <h5 className="ms-fontColor-white"> 1 hr 50 mins</h5>
                    </div>
                </div>
                <div className="rightmovieinfo">
                </div>
            </section>
            <section className="movieselectors">
                <div className="slicker">
                    <span>&#139;</span>
                    <div id="slicker-item1">
                        <h6 id="si1d"></h6>
                        <h6 id="si1dd"></h6>
                    </div>
                    <div id="slicker-item2">
                        <h6 id="si2d"></h6>
                        <h6 id="si2dd"></h6>
                    </div>
                    <div id="slicker-item3">
                        <h6 id="si3d"></h6>
                        <h6 id="si3dd"></h6>
                    </div>
                    <span>&#155;</span>
                </div>
                <div className="rightselector">
                    <PriceRange prop={[priceFilter => setpriceFilter(priceFilter),priceList]} />
                    <TimeRange prop={[timeFilter => settimeFilter(timeFilter),timeList]} />
                    <i className="ms-Icon ms-Icon--Search"></i>
                </div>
            </section>

            <section class="theatresigns"></section>
      

            <ShowList props={obj} />



        </div>
    );

}



export default Theater