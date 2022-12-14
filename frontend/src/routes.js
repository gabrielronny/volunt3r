import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useCookies } from 'react-cookie';

import FormularioQR from './pages/Dashboard/QrCode/FormularioQR';

import CriarUsuarioStep1 from './pages/CriarUsuario/CriarUsuarioStep1';
import CriarUsuarioStep2 from './pages/CriarUsuario/CriarUsuarioStep2';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha1';
import RecuperarSenha1Email from './pages/RecuperarSenha/RecuperarSenha1Email';
import RecuperarSenha2 from './pages/RecuperarSenha/RecuperarSenha2';
import RecuperarSenhaSucesso from './pages/RecuperarSenha/RecuperarSenhaSucesso';
import NotFound from './pages/NotFound/NotFound';
import Perfil from './pages/Perfil/Perfil';
import Feed from './pages/Feed/Feed.js';
import EventCatalog from './pages/EventCatalog/EventCatalog';
import Shop from './pages/Shop/Shop';
import RecuperarSenhaInvalido from './pages/RecuperarSenha/RecuperarSenhaTokenInvalido';
import CriarUsuarioDashboard from './pages/Dashboard/Gerencia_Usuarios/CriarUsuarioDashboard';
import ListarUsuariosDashboard from './pages/Dashboard/Gerencia_Usuarios/ListarUsuariosDashboard';
import CriarEventoDashboard from './pages/Dashboard/Eventos/CriarEventoDashboard';
import ListarEventosDashboard from './pages/Dashboard/Eventos/ListarEventosDashboard';
import RelatorioGeral from './pages/Dashboard/Relatorios/RelatorioGeral';
import QrCodePage from './pages/Dashboard/QrCode/QrCodePage';

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
                    <LoggedRoute exact path="/eventos" component={EventCatalog} />
                    <LoggedRoute exact path="/" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/recuperar-senha" component={RecuperarSenha} />
                    <Route exact path="/recuperar-senha/email" component={RecuperarSenha1Email} />
                    <Route exact path="/recuperar-senha/sucesso" component={RecuperarSenhaSucesso} />
                    <Route exact path="/recuperar-senha-redefinir/*" component={RecuperarSenha2} />
                    <Route exact path="/recuperar-senha/token-invalido" component={RecuperarSenhaInvalido} />
                    <Route exact path="/register" component={CriarUsuarioStep1} />
                    <LoggedRoute exact path="/perfil" component={Perfil} />
                    <LoggedRoute exact path="/perfil-conquistas" component={Perfil} />
                    <Route exact path="/register/step2" component={CriarUsuarioStep2} />
                    <LoggedRoute exact path="/dashboard" component={Dashboard}/>
                    <LoggedRoute exact path="/dashboard/gerencia-usuarios/criar-usuario" component={CriarUsuarioDashboard}/>
                    <LoggedRoute exact path="/dashboard/gerencia-usuarios/usuarios" component={ListarUsuariosDashboard}/>
                    <LoggedRoute exact path="/dashboard/eventos/criar-evento" component={CriarEventoDashboard}/>
                    <LoggedRoute exact path="/dashboard/eventos" component={ListarEventosDashboard}/>
                    <LoggedRoute exact path="/dashboard/relatorios/geral" component={RelatorioGeral}/>

                    <Route exact path="/dashboard/eventos/QRCode/:idEvento" component={QrCodePage} />
                    <Route exact path="/confirmar/:idEvento" component={FormularioQR} />
                    <Route path="*" component={NotFound} />
                    
                </Switch>
            </BrowserRouter>
        </ToastProvider>
    );

}


export default Routes;