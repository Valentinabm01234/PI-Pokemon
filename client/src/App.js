import { BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';
import PokemonCreate from '../src/components/PokemonCreate/PokemonCreate';
import PokemonDetail from '../src/components/PokemonDetail/PokemonDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={LandingPage}/>
        <Route exact path= '/home' component={Home}/>
        <Route path='/pokemon' component={PokemonCreate}/>
        <Route path='/home/:id' component={PokemonDetail}/>     
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
//terminado