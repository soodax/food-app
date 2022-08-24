import './Preloader.scss';
import PreloaderImage from '../../assets/images/preloader.gif'

const Preloader = () => {
    return (
        <div className='preloader'><img src={PreloaderImage} alt="loading..." /></div>
    )
}

export default Preloader;