'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SPLanding from './simple_prize/components/prize_landing';
import SPLoginContainer from './simple_prize/components/prize_login_container';
import SPSignupContainer from './simple_prize/components/prize_signup_container';
import SPRegisterPiece from './simple_prize/components/prize_register_piece';
import SPPieceList from './simple_prize/components/prize_piece_list';
import SPPieceContainer from './simple_prize/components/ascribe_detail/prize_piece_container';
import SPSettingsContainer from './simple_prize/components/prize_settings_container';
import SPApp from './simple_prize/prize_app';

import SluicePieceContainer from './sluice/components/sluice_detail/sluice_piece_container';

import PRApp from './portfolioreview/pr_app';
import PRLanding from './portfolioreview/components/pr_landing';
import PRRegisterPiece from './portfolioreview/components/pr_register_piece';

import EditionContainer from '../../ascribe_detail/edition_container';
import LogoutContainer from '../../logout_container';
import PasswordResetContainer from '../../password_reset_container';
import CoaVerifyContainer from '../../coa_verify_container';
import ErrorNotFoundPage from '../../error_not_found_page';

import { ProxyHandler, AuthRedirect } from '../../../components/ascribe_routes/proxy_handler';
import { AuthPrizeRoleRedirect } from './portfolioreview/components/pr_routes/pr_proxy_handler';


const ROUTES = {
    sluice: (
        <Route path='/' component={SPApp}>
            <IndexRoute component={SPLanding} />
            <Route
                path='login'
                component={ProxyHandler(AuthRedirect({to: '/collection', when: 'loggedIn'}))(SPLoginContainer)} />
            <Route
                path='logout'
                component={ProxyHandler(AuthRedirect({to: '/', when: 'loggedOut'}))(LogoutContainer)}/>
            <Route
                path='signup'
                component={ProxyHandler(AuthRedirect({to: '/collection', when: 'loggedIn'}))(SPSignupContainer)} />
            <Route
                path='password_reset'
                component={ProxyHandler(AuthRedirect({to: '/collection', when: 'loggedIn'}))(PasswordResetContainer)} />
            <Route
                path='settings'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(SPSettingsContainer)}/>
            <Route
                path='register_piece'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(SPRegisterPiece)}
                headerTitle='+ NEW WORK'/>
            <Route
                path='collection'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(SPPieceList)}
                headerTitle='COLLECTION'
                disableOn='noPieces' />
            <Route path='pieces/:pieceId' component={SluicePieceContainer} />
            <Route path='editions/:editionId' component={EditionContainer} />
            <Route path='verify' component={CoaVerifyContainer} />
            <Route path='*' component={ErrorNotFoundPage} />
        </Route>
    ),
    portfolioreview: (
        <Route path='/' component={PRApp}>
        <IndexRoute component={ProxyHandler(AuthPrizeRoleRedirect({ to: '/collection', when: ['is_admin', 'is_judge', 'is_jury'] }))(PRLanding)} />
            <Route
                path='register_piece'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(PRRegisterPiece)}/>
            <Route
                path='collection'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(SPPieceList)}
                headerTitle='SUBMISSIONS'
                disableOn='noPieces' />
            <Route
                path='login'
                component={ProxyHandler(
                    AuthPrizeRoleRedirect({ to: '/collection', when: ['is_admin', 'is_judge', 'is_jury'] }),
                    AuthRedirect({to: '/register_piece', when: 'loggedIn'})
                )(SPLoginContainer)} />
            <Route
                path='logout'
                component={ProxyHandler(AuthRedirect({to: '/', when: 'loggedOut'}))(LogoutContainer)} />
            <Route
                path='signup'
                component={ProxyHandler(
                    AuthPrizeRoleRedirect({ to: '/collection', when: ['is_admin', 'is_judge', 'is_jury'] }),
                    AuthRedirect({to: '/register_piece', when: 'loggedIn'})
                )(SPSignupContainer)} />
            <Route
                path='password_reset'
                component={ProxyHandler(
                    AuthPrizeRoleRedirect({ to: '/collection', when: ['is_admin', 'is_judge', 'is_jury'] }),
                    AuthRedirect({to: '/register_piece', when: 'loggedIn'})
                )(PasswordResetContainer)} />
            <Route
                path='settings'
                component={ProxyHandler(AuthRedirect({to: '/login', when: 'loggedOut'}))(SPSettingsContainer)}/>
            <Route path='pieces/:pieceId' component={SPPieceContainer} />
            <Route path='editions/:editionId' component={EditionContainer} />
            <Route path='verify' component={CoaVerifyContainer} />
            <Route path='*' component={ErrorNotFoundPage} />
        </Route>
    )
};


function getRoutes(commonRoutes, subdomain) {
    if(subdomain in ROUTES) {
        return ROUTES[subdomain];
    } else {
        throw new Error('Subdomain wasn\'t specified in the wallet app.');
    }
}


export default getRoutes;
