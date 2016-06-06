import React from 'react';
import Route from 'react-router/es6/Route';

import AscribeApp from './components/ascribe_app';

import PieceList from './components/piece_list';
import PieceContainer from './components/ascribe_detail/piece_container';
import EditionContainer from './components/ascribe_detail/edition_container';

import LoginContainer from './components/login_container';
import LogoutContainer from './components/logout_container';
import SignupContainer from './components/signup_container';
import PasswordResetContainer from './components/password_reset_container';

import ContractSettings from './components/ascribe_settings/contract_settings';
import SettingsContainer from './components/ascribe_settings/settings_container';
import CoaVerifyContainer from './components/coa_verify_container';

import ErrorNotFoundPage from './components/error_not_found_page';

import RegisterPiece from './components/register_piece';

import Footer from './components/footer';

import { ProxyHandler, AuthRedirect } from './components/ascribe_routes/proxy_handler';

import { getLangText } from './utils/lang_utils';


const Routes = (
    <Route path="/" component={AscribeApp}>
        <Route
            path="login"
            component={ProxyHandler(AuthRedirect({ to: '/collection', when: 'loggedIn' }))(LoginContainer)}
            footer={Footer} />
        <Route
            path="register_piece"
            component={ProxyHandler(AuthRedirect({ to: '/login', when: 'loggedOut' }))(RegisterPiece)}
            headerTitle={getLangText('+ NEW WORK')}
            footer={Footer} />
        <Route
            path="collection"
            component={ProxyHandler(AuthRedirect({ to: '/login', when: 'loggedOut' }))(PieceList)}
            headerTitle={getLangText('COLLECTION')}
            disableOn="noPieces"
            footer={Footer} />
        <Route
            path="signup"
            component={ProxyHandler(AuthRedirect({ to: '/collection', when: 'loggedIn' }))(SignupContainer)}
            footer={Footer} />
        <Route
            path="logout"
            component={ProxyHandler(AuthRedirect({ to: '/login', when: 'loggedOut' }))(LogoutContainer)}
            footer={Footer} />
        <Route path="pieces/:pieceId" component={PieceContainer}
            footer={Footer} />
        <Route path="editions/:editionId" component={EditionContainer}
            footer={Footer} />
        <Route
            path="password_reset"
            component={ProxyHandler(AuthRedirect({ to: '/collection', when: 'loggedIn' }))(PasswordResetContainer)}
            footer={Footer} />
        <Route
            path="settings"
            component={ProxyHandler(AuthRedirect({ to: '/login', when: 'loggedOut' }))(SettingsContainer)}
            footer={Footer} />
        <Route
            path="contract_settings"
            component={ProxyHandler(AuthRedirect({ to: '/login', when: 'loggedOut' }))(ContractSettings)}
            footer={Footer} />
        <Route
            path="coa_verify"
            component={CoaVerifyContainer}
            footer={Footer} />
        <Route
            path="*"
            component={ErrorNotFoundPage}
            footer={Footer} />
    </Route>
);

export default Routes;
