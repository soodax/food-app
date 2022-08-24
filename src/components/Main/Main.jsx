import './Main.scss';
import * as axios from 'axios';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Preloader from '../Preloader/Preloader';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Main = ({ type }) => {

    const [foodData, setFoodData] = useState();
    const [currentFood, setCurrentFood] = useState('Orange');
    const [otherFood, setOtherFood] = useState();
    const [listIsFull, changeListState] = useState(false);

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

    const findProduct = async (value) => {
        let response = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}&detailed=true`, {
            headers: {
                'x-app-id': '54f5d3b6',
                'x-app-key': 'd34ddd01bf17a0575a64a71526e00c07',
                'x-remote-user-id': '0'
            }
        });

        if (response.data.common.length === 0) {
            return alert('No matches')
        } else {
            setCurrentFood(value);
        }

        setFoodData(response.data);
        // console.log(response.data)
        let temp = [];
        for (let i = 1; i < 11; i++) {
            if (type == 'common') {
                temp[i] = response.data.common[i].food_name;
            } else {
                temp[i] = response.data.branded[i].food_name;
            }

        }
        setOtherFood(temp);
    }

    const clearField = () => {
        setCurrentFood('');
    }

    useEffect(() => {
        findProduct(currentFood);
    }, [])

    if (!foodData || !otherFood) {
        return <Preloader />
    }

    return (
        <div className='main'>
            <h1 className='title'>{type === 'common' ? 'Common food' : 'Branded food'}</h1>
            <div className='main__inputs'>
                <TextField id="outlined-basic"
                    placeholder='Enter food name...'
                    variant="outlined"
                    value={currentFood}
                    onChange={(e) => setCurrentFood(e.currentTarget.value)} />
                <ThemeProvider theme={theme}>
                <Button color='clear' variant="contained" onClick={clearField}>Clear</Button>
                <Button color='search' variant="contained" onClick={() => findProduct(currentFood)}>Search</Button>
                </ThemeProvider>
                
            </div>
            <div className='main__block'>
                <img src={type === 'common'
                    ? foodData.common[0].photo.thumb
                    : foodData.branded[0].photo.thumb} alt="" />

                <div className='main__info'>
                    <h2>{type === 'common'
                        ? foodData.common[0].food_name
                        : foodData.branded[0].food_name}</h2>
                    <div className="main__nutrients">
                        <div>Proteins: {type === 'common'
                            ? foodData.common[0].full_nutrients[0].value
                            : foodData.branded[0].full_nutrients[0].value}</div>
                        <div>Fats: {type === 'common'
                            ? foodData.common[0].full_nutrients[1].value
                            : foodData.branded[0].full_nutrients[1].value}</div>
                        <div>Carbohydrates: {type === 'common'
                            ? foodData.common[0].full_nutrients[2].value
                            : foodData.branded[0].full_nutrients[2].value}</div>
                        <div>Portion: {type === 'common'
                            ? foodData.common[0].serving_unit
                            : foodData.branded[0].serving_unit}</div>
                        <div>Weight: {type === 'common'
                            ? foodData.common[0].serving_weight_grams
                            : foodData.branded[0].serving_weight_grams} g.</div>
                    </div>

                </div>
            </div>
            <div className='main__help'>
                <h2>You can also check:</h2>
                {otherFood.map((item, index) => {
                    if (listIsFull) {
                        return <button key={index}
                            className='main__help-item'
                            onClick={(e) => findProduct(e.currentTarget.value)}
                            value={item}>
                            <span>{item}</span>
                        </button>
                    } else {
                        if (index < 6) {
                            return <button key={index}
                                className='main__help-item'
                                onClick={(e) => findProduct(e.currentTarget.value)}
                                value={item}>
                                <span>{item}</span>
                            </button>
                        }
                    }
                })}
            </div>
            {!listIsFull
                ? <button className='main__toggler' onClick={() => changeListState(true)}>
                    <span>Show more <KeyboardArrowRightIcon className='btn-icon down-icon' /></span>

                </button>
                : <button className='main__toggler' onClick={() => changeListState(false)}>
                    <span>Close <KeyboardArrowRightIcon className='btn-icon up-icon' /></span>

                </button>}
        </div>
    )
}

export default Main;