import styles from '../../bms.css';
import CityModal from './CityModal';
export const HeaderRight = () => {
    return (
        <div className="right-bar">
        <CityModal />
        <div class="ham">
         <i class="ms-Icon ms-Icon--GlobalNavButton ms-fontColor-white ms-fontSize-18 "></i></div>
        </div>
    )
}

export default HeaderRight