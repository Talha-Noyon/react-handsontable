import React, { Suspense, lazy , useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Misc from "./Misc";

// const GoogleMaterialPage = lazy(() =>
//   import("./google-material/GoogleMaterialPage")
// );
// const ReactBootstrapPage = lazy(() =>
//   import("./react-bootstrap/ReactBootstrapPage")
// );

export default function HomePage() {
  // useEffect(() => {
  //   console.log('Home page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  useEffect(() => {
    // Update the document title using the browser API
    let history = createBrowserHistory();
    let title = history.location.pathname.replace("/", "");
    document.title = "Title - "+title.charAt(0).toUpperCase() + title.slice(1);
  });
  return (
    <Suspense>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/misc" />
        }
        {/* <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} /> */}
        <Route path="/misc" component={Misc} />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
