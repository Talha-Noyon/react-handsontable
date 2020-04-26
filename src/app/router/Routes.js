/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {useLastLocation} from "react-router-last-location";
import HomePage from "../pages/home/HomePage";
import * as routerHelpers from "../router/RouterHelpers";
import axios from "axios";
export const Routes = withRouter(({history}) => {
    const lastLocation = useLastLocation();
    routerHelpers.saveLastLocation(lastLocation);
    
    return (
        <Switch>
            <HomePage history={history} userLastLocation={lastLocation}/>
            {/* <Layout>
                <HomePage userLastLocation={userLastLocation}/>
            </Layout> */}
        </Switch>
    );
});
