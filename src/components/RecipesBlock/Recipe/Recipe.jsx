import './Recipe.scss';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Alert from '@mui/material/Alert';
import { addFavouriteRecipe, removeFavouriteRecipe } from '../../../store/mainSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect, useState } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ item, setNotificationStatus, notificationStatus }) {
    const [expanded, setExpanded] = useState(false);
    const [isLiked, setLikeStatus] = useState(false);
    const favouriteRecipes = useSelector(state => state.main.favouriteRecipes);

    const dispatch = useDispatch()

    useEffect(() => {
        checkLikeStatus();
    }, [])

    const checkLikeStatus = () => {
        for (let i = 0; i < favouriteRecipes.length; i++) {
            if (favouriteRecipes[i].recipe.recipe.url === item.recipe.url) {
                setLikeStatus(true);
            }
        }
    }

    const toggleLike = () => {
        
        if (!isLiked) {
            dispatch(addFavouriteRecipe({item}))
            setLikeStatus(true);
        } else {
            dispatch(removeFavouriteRecipe({item}))
            setLikeStatus(false);
        }
        checkLikeStatus();
    }
    
    const shareRecipe = () => {
        navigator.clipboard.writeText(item.recipe.url);
        setNotificationStatus(true);
        setTimeout(() => setNotificationStatus(false), 2500);
        // alert('Link successfully copied');
        
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 300 }}> 
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.recipe.label[0]}
                    </Avatar>
                }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={item.recipe.label}
                subheader={`${Math.round(item.recipe.calories)} cal.`} />
            <CardMedia component="img"
                height="194"
                image={item.recipe.images.REGULAR.url}
                alt="dish" />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    <span className='recipe__cuisineType'>{item.recipe.cuisineType[0]}</span>
                    {/* <span className='recipe__calories'>{Math.round(item.recipe.calories)} cal.</span> */}
                    <span className='recipe__dishType'>{item.recipe.dishType[0]}</span>
                    <span className='recipe__dishType'>{item.recipe.mealType[0]}</span>
                    <span>
                        protein: {Math.round(item.recipe.totalNutrients.PROCNT.quantity)} {item.recipe.totalNutrients.PROCNT.unit}.
                    </span>
                    <span>
                        fat: {Math.round(item.recipe.totalNutrients.FAT.quantity)} {item.recipe.totalNutrients.FAT.unit}.
                    </span>
                    <span>
                        carbs: {Math.round(item.recipe.totalNutrients.CHOCDF.quantity)} {item.recipe.totalNutrients.CHOCDF.unit}.
                    </span>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={toggleLike}>
                    {!isLiked ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                </IconButton>
                <IconButton aria-label="share" onClick={shareRecipe}>
                    <ShareIcon />
                </IconButton>
                <ExpandMore expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        <ul>
                            {item.recipe.ingredientLines.map((item, index) => {
                                return <li key={index}>{item}</li>
                            })}
                        </ul>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
