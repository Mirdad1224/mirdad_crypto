import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import routes from "./routes";
import {UserThemeContext} from './store/ThemeContext'

import { useRoutes } from "react-router-dom";
import { useContext } from "react";

function App() {

  const userTheme = useContext(UserThemeContext)

  let router = useRoutes(routes);

  return (
      <div
      className={`${
        userTheme.theme === "dark" ? 'darkTheme' : ""
      }`}>
        <Navbar />
        {router}
        <Footer />
      </div>
  );
}

export default App;
