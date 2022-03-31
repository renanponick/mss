import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Sobre from './pages/Sobre';
import Cadastros from './pages/Cadastros';
import CadastroMedico from './pages/doutor/CadastroDoutor'
import CadastroPaciente from './pages/paciente/CadastroPaciente'
import CadastroFarmacia from './pages/farmacia/CadastroFarmacia'
import CadastroReceita from './pages/receita/CadastroReceita'
import TelaPaciente from './pages/paciente/TelaPaciente'
import TelaFarmacia from './pages/farmacia/TelaFarmacia'

function App() {

  return (
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/sobre' component={Sobre} />
          <Route path='/cadastros' component={Cadastros}/>
          <Route path='/cadastromedico' component={CadastroMedico}/>
          <Route path='/cadastropaciente' component={CadastroPaciente}/>
          <Route path='/cadastrofarmacia' component={CadastroFarmacia}/>
          <Route path='/cadastroreceita' component={CadastroReceita}/>
          <Route path='/telapaciente' component={TelaPaciente}/>
          <Route path='/telafarmacia' component={TelaFarmacia}/>
        </Switch>
        
      </Router>
  );
}

export default App;