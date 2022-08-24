import { useEffect, useState } from "react";
import Main from "./Main";
import './MainContainer.scss';

const MainContainer = (props) => {
    return (
        <div className="mainContainer">
            <Main type={'common'} />
            <Main type={'branded'} />
        </div>
    )
}

export default MainContainer;