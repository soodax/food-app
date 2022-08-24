import "./App.scss";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import RecipesBlock from "./components/RecipesBlock/RecipesBlock";
import MainContainer from "./components/Main/MainContainer";
import Favorites from "./components/Favourites/Favourites";
import { useState } from "react";

function App() {
  const [notificationStatus, setNotificationStatus] = useState(false);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/main" element={<MainContainer />} />
        <Route
          path="/recipes"
          element={
            <RecipesBlock
              setNotificationStatus={setNotificationStatus}
              notificationStatus={notificationStatus}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favorites
              setNotificationStatus={setNotificationStatus}
              notificationStatus={notificationStatus}
            />
          }
        />
        <Route path="/" element={<Navigate to="/main" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
