// import des librairies
import './style/App.css';
import Header from "./component/Header";
import Footer from "./component/Footer"
import Register from "./component/Register";
import Login from "./component/Login"
import TrCreate from "./component/TrCreate";
import TrManage from "./component/TrManage";
import UserManage from "./component/UserManage";

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
              <Route exact strict path="/" element={<Login />} />
              <Route exact strict path="/Login" element={<Login />} />
              <Route exact strict path="/Register"  element={<Register />}/>
              <Route exact strict path="/user-management"  element={<UserManage />}/>
              <Route exact strict path="/training-management"  element={<TrManage />}/>
              <Route exact strict path="/training-creation"  element={<TrCreate />}/>
              <Route exact strict path="/" element={() => <div>ERROR 404</div>}/>
          </Routes>

          <Footer />
        </Router>

      </div>
  );
}
//export pour affichage front end
export default App;
