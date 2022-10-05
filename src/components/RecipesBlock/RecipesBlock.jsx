import './RecipesBlock.scss';
import { useState } from 'react';
import * as axios from 'axios';
import Recipe from './Recipe/Recipe';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RecipesBlock = ({setNotificationStatus, notificationStatus}) => {

    const [recipesData, setRecipesData] = useState();
    const [currentRecipe, setCurrentRecipe] = useState('');
    const [buttonIsDisabled, changeButtonState] = useState(false);
    const appKey = process.env.REACT_APP_EDAMAM_API_KEY;
    const appID = process.env.REACT_APP_EDAMAM_APP_ID;

    const theme = createTheme({
        palette: {
            search: {
                main: '#66bb6a',
                contrastText: '#FFFFFF',
                light: '#81c784',
                dark: '#388e3c',
            },
            clear: {
                main: '#f44336',
                contrastText: '#FFFFFF',
                // contrastText: '#000000'
                light: '#e57373',
                dark: '#d32f2f',
            }
        },
    });

    const findRecipe = async () => {
        changeButtonState(true);
        let response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${currentRecipe}&app_id=${appID}&app_key=${appKey}`);
        setRecipesData(response.data.hits);
        // console.log(response.data.hits)
        setTimeout(() => changeButtonState(false), 10000);
    }

    const clearField = () => {
        setCurrentRecipe('');
    }

    return (
        <div className='recipesBlock'>
            <div className={!notificationStatus 
            ? 'notification notification-off' 
            : 'notification notification-on' }>
            <CheckCircleIcon />
            Link successfully copied
            </div>
            <h1 className='title'>What dish do you want?</h1>
            <div className='recipesBlock__inputs'>
                <TextField id="filled-basic"
                    label="Enter an ingredient or dish name..."
                    variant="outlined"
                    value={currentRecipe}
                    onChange={(e) => setCurrentRecipe(e.currentTarget.value)} />
                <ThemeProvider theme={theme}>
                <Button color='clear' variant="contained" onClick={clearField}>Clear</Button>
                <Button color='search' variant="contained" disabled={buttonIsDisabled} onClick={findRecipe}>Search</Button>
                </ThemeProvider>
                
            </div>
            {!recipesData
                ? <div></div>
                : <div className='recipesBlock__row'>
                    {recipesData.map((item, index) => {
                        return <Recipe key={index} 
                        item={item} 
                        notificationStatus={notificationStatus}
                        setNotificationStatus={setNotificationStatus}/>
                    })}
                </div>}
        </div>
    )
}

export default RecipesBlock;