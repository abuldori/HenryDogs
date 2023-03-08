import './App.css';
import { Route, Switch } from "react-router-dom"
import Home from "./components/Dogs/Dogs"
import LandingPage from './components/LandingPage/Landing';
import DogDetail from './components/DogDetail/DogDetail';
import DogCreate from "./components/DogCreate/DogCreate"
import axios from "axios"
axios.defaults.baseURL = 'https://deploy-production-208a.up.railway.app/';

function App () {

  return (
      <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/detail/:id" component={DogDetail}></Route>
          <Route exact path="/dog" component={DogCreate}></Route>
      </Switch>
  
  );
}

export default App;
