// import des librairies
import './style/App.css';
import Header from "./component/Header";
import Footer from "./component/Footer"
import Register from "./component/Register";

import{BrowserRouter as Router, Route, Routes} from "react-router-dom";


// la fonction App est afficher sur le front end, et sert ici de page de routing
function App() {
  return (
      <div className="App">
        <Router forceRefresh={true}>

          <Header />
          <br/>
          <br/>
          <br/>

          <Routes>
            <Route path="/" exact component={Register}/>
            <Route path="/" component={() => <div className="Error 404">ERROR 404</div>}/>
          </Routes>

          <Footer />
        </Router>

      </div>
  );
}
//export pour affichage front end
export default App;
