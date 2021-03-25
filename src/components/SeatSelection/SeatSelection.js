import { render } from '@testing-library/react';
import React, { useContext, useState } from 'react';
import styles from '../../bms.css';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../../MovieContext';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
let leftt;//seat left to be selected 
let c;//initial user number of seats choice
let bookedArray;
let alreadyBooked;
let occupiedSeats;
const SeatSelection = () => {
    const [modalIsOpen, setModalIsOpen] = useState(true)
    let { moviename, cinema, id } = useParams();

    const value = useContext(MovieContext);
    const [movies, setMovies] = value;
    const clone = movies.filter(m => {
        return m.name === moviename

    });
    var newclone={};
    newclone.theater = clone[0].theater.filter(i => {
        return i.cinema === cinema
    })
    console.log(newclone, "ss");
    let time = newclone.theater[0].timing[id];
    let price = newclone.theater[0].price[id];
    var rows = document.querySelectorAll('.row');
function occupyprevseats(){
    bookedArray = JSON.parse(localStorage.getItem("bookingArray"));
    if (localStorage.getItem("index") > 0) {
        for (var j = 0; j < localStorage.getItem("index"); j++) {
            console.log("im inside");
            alreadyBooked = bookedArray[j];
            if (alreadyBooked.moviename === moviename && alreadyBooked.cinema === cinema && alreadyBooked.time == time) {
                occupiedSeats = alreadyBooked.bookedSeatArray;
                console.log(occupiedSeats)
                for (var i = 0; i < occupiedSeats.length; i = i + 1) {
                    console.log(occupiedSeats[i]);
                    document.getElementById(occupiedSeats[i]).classList.add("occupied");
                }
            }
        }
    }
}



    var b;//number of seat modal  value 
    var ssc = 0;
    var seatcontainer;
    var seats;
    var booking = {
        moviename: moviename,
        cinema: cinema,
        time: clone[0].theater[0].timing[id],
        id: id,

    };
    const[vehicleimg,setimg]=useState();
    let hoverfill= e =>{
        if (b != null) {
            b.classList.remove("active");
        }
        b=e.target;
        e.target.className = 'active';
    }
    let fill = e => {
      
        if (b != null) {
            b.classList.remove("active");
        }
        b = e.target;
        e.target.className = 'active';
        c = e.target.innerHTML;
        leftt = c;
        console.log(leftt);
        setimg(`Img${c}`);
        console.log(vehicleimg);
        document.getElementById("ticketheading").innerHTML = "GOLD-RS." + clone[0].theater[0].price[id];
        document.getElementById("numberoftickets").innerHTML = c;
        occupyprevseats();
    }
    const updateSelectedSeatsCount = () => {
        const selectedSeats = document.querySelectorAll('.row .selected');
        console.log(selectedSeats.length);
        const selectedSeatsCount = selectedSeats.length;
        console.log(c);
        if (selectedSeatsCount == (c)) {
            document.getElementById("bookticket").style.display = "flex";
            document.getElementById("total").innerHTML = c * clone[0].theater[0].price[id];
            console.log("tobeblocked");
        }
        else if (selectedSeatsCount !== (c)) {
            document.getElementById("bookticket").style.display = "none";
        }
    };
    function clear() {
        var xx = document.querySelectorAll(".selected");
        for (var x = 0; x < xx.length; x++) {
            xx[x].classList = 'seat';
            leftt++;
        }
        var ssc = 0;
    }
    function clearseat() {
        document.getElementById("bookticket").style.display = "none";
        setModalIsOpen(true);

        clear();

    }
    console.log(leftt);
    let occupy = e => {
        if (
            e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')
        ) {
            console.log(leftt);
            if (leftt <= 0) {
                clear();
            }
            e.target.classList.toggle('selected');
            leftt--;
            console.log(leftt);
            for (var z = 0; z < rows.length; z++) {
                var ssr = rows[z].getElementsByClassName("selected");
                console.log(ssr);
                if (ssr.length == 1) {
                    var sir = rows[z].querySelectorAll(".seat");//        seats in row
                    console.log(sir);
                    for (var y = 0; y < sir.length; y++) {
                        console.log(y);
                        if (sir[y].classList.contains('selected')) {
                            var flag = 0;
                            console.log(leftt);
                            for (var k = 1; k <= leftt && y + k < sir.length; k++) {

                                if (!sir[y + k].classList.contains('occupied')) {
                                    sir[y + k].classList.toggle('selected');
                                    flag++;
                                    console.log(leftt);
                                }
                            }
                            leftt -= flag;
                            y = sir.length;
                            console.log(leftt);
                            updateSelectedSeatsCount();
                        }
                    }
                }
                else {
                    console.log("gadbad");
                }
            }
            updateSelectedSeatsCount();

        }
        else if (ssc == c && e.target.classList.contains('selected')) {
            e.target.classList.toggle('selected');
            leftt++;
            updateSelectedSeatsCount();
        }
    }
    function store() {
        var ssr = document.getElementsByClassName("selected");
        var bookedSeatArray = [];
        for (var i = 0; i < ssr.length; i++) {
            bookedSeatArray[i] = ssr[i].id;
        }

        booking.bookedSeatArray = bookedSeatArray;
        console.log(booking);
        var inc = localStorage.getItem("index");
        if (localStorage.getItem("index") == 0) {
            var bookingArray = [];
            bookingArray[0] = booking;
            localStorage.setItem("bookingArray", JSON.stringify(bookingArray));

            localStorage.setItem("index", ++inc);
        }
        else {
            bookingArray = JSON.parse(localStorage.getItem("bookingArray"));
            bookingArray[inc++] = booking;
            localStorage.setItem("bookingArray", JSON.stringify(bookingArray));
            localStorage.setItem("index", inc);
        }
    }

    return (<div>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={
            {
                padding: '0px'
            }
        }>
            <div className="seatmodal-content">
                <header>
                    <p>How Many Seats</p>
                </header>
                <div className="transport"><img id="vehicle" src={{vehicleimg}} alt=""></img></div>
                <section className="numberofseats">
                    <div onClick={fill} onMouseOver={hoverfill}> <p>1</p></div>
                    <div onClick={fill} onMouseOver={hoverfill} ><p>2</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>3</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>4</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>5</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>6</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>7</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>8</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>9</p></div>
                    <div onClick={fill} onMouseOver={hoverfill}><p>10</p></div> 
                </section>
                <button id="selectseats" onClick={() => setModalIsOpen(false)}><p>Select Seats</p></button>
            </div>



        </Modal>
        <header className="seatbanner darkbg">
            <div className="leftcontent">
            <Link style={{ color: 'white', textDecoration: 'none' }}
            to={`/theater/${moviename}`
               
}>
                <i className="ms-Icon ms-Icon--ChevronLeft ms-fontSize-32 ms-fontColor-white"></i>
               </Link>
                <div className="leftinject">
                    <p id="movietitle">{moviename}</p>
                    <p id="theatre">{cinema}</p>
                </div>
            </div>
            <div className="rightinject">
                <div className="ticketdrop">
                    <p id="numberoftickets"></p>
                    <p>Tickets</p>
                    <i className="ms-Icon ms-Icon--ChevronDownSmall ms-fontColor-white" styles="cursor: pointer;" onClick={() => clearseat()} ></i>
                </div>
                <div className="close"></div>
            </div>

        </header>
        <div id="dayandtime" style={{ height: '5vh', backgroundColor: 'grey' }}>
            <p id="dandt" className="ms-fontColor-gray20">Today,{time}</p></div>
        <div id="seatcontainer">

            <div className="priceheading">
                <p className="ms-fontColor-gray100 ms-fontSize-m" id="ticketheading"></p>

            </div>
            <div className="row">
                <div className="seat" id="1" onClick={occupy}></div>
                <div className="seat" id="2" onClick={occupy}></div>
                <div className="seat" id="3" onClick={occupy}></div>
                <div className="seat" id="4" onClick={occupy}></div>
                <div className="seat" id="5" onClick={occupy}></div>
                <div className="seat" id="6" onClick={occupy}></div>
                <div className="seat" id="7" onClick={occupy}></div>
                <div className="seat" id="8" onClick={occupy}></div>
            </div>

            <div className="row">
                <div className="seat" id="9" onClick={occupy}></div>
                <div className="seat" id="10" onClick={occupy}></div>
                <div className="seat" id="11" onClick={occupy}></div>
                <div className="seat" id="12" onClick={occupy}></div>
                <div className="seat" id="13" onClick={occupy}></div>
                <div className="seat" id="14" onClick={occupy}></div>
                <div className="seat" id="15" onClick={occupy}></div>
                <div className="seat" id="16" onClick={occupy}></div>
            </div>

            <div className="row">
                <div className="seat" id="17" onClick={occupy}></div>
                <div className="seat" id="18" onClick={occupy}></div>
                <div className="seat" id="19" onClick={occupy}></div>
                <div className="seat" id="20" onClick={occupy}></div>
                <div className="seat" id="21" onClick={occupy}></div>
                <div className="seat" id="22" onClick={occupy}></div>
                <div className="seat" id="23" onClick={occupy}></div>
                <div className="seat" id="24" onClick={occupy}></div>
            </div>

            <div className="row">
                <div className="seat" id="25" onClick={occupy}></div>
                <div className="seat" id="26" onClick={occupy}></div>
                <div className="seat" id="27" onClick={occupy}></div>
                <div className="seat" id="28" onClick={occupy}></div>
                <div className="seat" id="29" onClick={occupy}></div>
                <div className="seat" id="30" onClick={occupy}></div>
                <div className="seat" id="31" onClick={occupy}></div>
                <div className="seat" id="32" onClick={occupy}></div>
            </div>

            <div className="row">
                <div className="seat" id="33" onClick={occupy}></div>
                <div className="seat" id="34" onClick={occupy}></div>
                <div className="seat" id="35" onClick={occupy}></div>
                <div className="seat" id="36" onClick={occupy}></div>
                <div className="seat" id="37" onClick={occupy}></div>
                <div className="seat" id="38" onClick={occupy}></div>
                <div className="seat" id="39" onClick={occupy}></div>
                <div className="seat" id="40" onClick={occupy}></div>
            </div>

            <div className="row">
                <div className="seat" id="41" onClick={occupy}></div>
                <div className="seat" id="42" onClick={occupy}></div>
                <div className="seat" id="43" onClick={occupy}></div>
                <div className="seat" id="44" onClick={occupy}></div>
                <div className="seat" id="45" onClick={occupy}></div>
                <div className="seat" id="46" onClick={occupy}></div>
                <div className="seat" id="47" onClick={occupy}></div>
                <div className="seat" id="48" onClick={occupy}></div>
            </div>
            <div className="screen"></div>

            <p style={{ textAlign: 'center', alignSelf: 'center', zIndex: '0' }}>All eyes this way</p>
            <div className="seat-annotation"><div className="seat" styles={{ backgroundColor: 'white' }}></div><p>Available</p><div className="seat" style={{ backgroundColor: 'grey' }}></div><p>unavailable</p><div className="seat" style={{ backgroundColor: 'red' }}></div><p>Selected</p></div>
        </div>
        <footer id="bookticket" style={{ zIndex: '2' }}>
            <Link style={{ color: 'black', textDecoration: 'none' }}
                to={`/Ticket`}>
                <button id="book" style={{ width: "30%" }} onClick={() => store()} >
                    <p className="ms-Icon ms-fontSize-xl">Pay Rs.</p><p className="ms-Icon ms-fontSize-xl" id="total"></p>
                </button>
            </Link>
        </footer>
    </div>

    );

}


export default SeatSelection

