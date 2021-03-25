import styles from '../../bms.css';
import movieImage from '../../asset/bms.jpg';
import { Link } from 'react-router-dom';
export const HeaderLeft = () => {
  return (
    <div className="left-bar">
      <Link style={{ color: 'black', textDecoration: 'none' }}
        to={'/'}>

        
        <img src={movieImage} style={logoStyle}>
        </img>
         </Link>
      
      <input type="text" class="topsearch" placeholder="Search for movies,Events,Plays,Sports and Activities"></input>
    </div>
  )
}
const logoStyle = {
  height: '50px',
  width: '50px'
}

export default HeaderLeft