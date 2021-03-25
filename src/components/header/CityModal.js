import styles from '../../bms.css';
import React,{useState} from 'react';
import Modal from 'react-modal';
 const CityModal = () => {
    const[modalIsOpen, setModalIsOpen]= useState(false)
    return (
        <div id="drop">
          <div onClick={() => setModalIsOpen(true)}>city</div>
          <Modal  isOpen={modalIsOpen} onRequestClose={() =>setModalIsOpen(false)}style={
            {
              padding:'0px'
            }
          }>
        
           <div class="modal-content">

          <input type="text" class="modalsearch" placeholder="Search for your city">
            </input>
          <div class="modal-main">
            <h4>Popular Cities</h4>
            <div class="cities">
              <div class="city">
              <i class="ms-Icon ms-Icon--CityNext ms-fontSize-68"></i>
              <p>surat</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>mumbai</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>ahmdebad</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>bangalore</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>hyderabad</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>Chennai</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>Kolkata</p>
            </div>
            <div class="city">
              <i class="ms-Icon ms-Icon--CityNext  ms-Icon--CityNext ms-fontSize-68"></i>
              <p>Bangalore</p>
            </div>
            </div>
            <h4><a>View all Cities</a></h4>
          </div>
          </div>
          {/* </div> */}

          </Modal>
        </div>
    )
}


export default CityModal