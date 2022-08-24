import './Favourites.scss';
import { useDispatch, useSelector } from 'react-redux';
import Recipe from '../RecipesBlock/Recipe/Recipe';
import { removeFavouriteRecipe } from '../../store/mainSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Favorites = ({setNotificationStatus, notificationStatus}) => {

    const favouriteRecipes = useSelector(state => state.main.favouriteRecipes);

    if (favouriteRecipes.length === 0) {
        return <div className='favourites'>
            <h1 className='title'>No favourite recipes yet...</h1>
            </div>
    }

    return (
        <div className='favourites'>
            <div className={!notificationStatus 
            ? 'notification notification-off' 
            : 'notification notification-on' }>
            <CheckCircleIcon />
            Link successfully copied
            </div>
            <h1 className='title'>Favourites</h1>
            <div className='favourites__row'>
            {favouriteRecipes.map((value, index) => {
                return <Recipe item={value.recipe} key={index} setNotificationStatus={setNotificationStatus}/>
            })}
            </div>

        </div>
    )
}

export default Favorites;