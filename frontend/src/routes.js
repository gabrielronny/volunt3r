import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';

import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha1';
import NotFound from './pages/NotFound/NotFound';
import Feed from './pages/Feed/Feed.js';
import EventCatalog from './pages/EventCatalog/EventCatalog';
import Shop from './pages/Shop/Shop';
import RelatorioPage from './pages/RelatorioPage/RelatorioPage';
import CriarEventoPage from './pages/CriarEventoPage/CriarEventoPage';

function Routes() {
    const [cookies] = useCookies(['volunt3r', 'volunt3r_user']);

    const LoggedRoute = ({ component: Component, ...rest }) => (
        <Route
          {...rest}
          render={props =>
            cookies.volunt3r !== null && cookies.volunt3r !== undefined ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            )
          }
        />
      );

    return (
        <ToastProvider>
            <BrowserRouter>
                <Switch>
                    <LoggedRoute exact path="/shop" component={Shop} />
                    <LoggedRoute exact path="/catalog" component={EventCatalog} />
                    <LoggedRoute exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/recuperar-senha" component={RecuperarSenha} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    <LoggedRoute exact path="/dashboard" component={Dashboard}/>
                    <LoggedRoute exact path="/dashboard/relatorios" component={RelatorioPage}/>
                    <LoggedRoute exact path="/dashboard/criar-eventos" component={CriarEventoPage}/>
                    <Route path="*" component={NotFound} />

                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;