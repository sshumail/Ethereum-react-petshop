import React from "react";
import Theme from "./theme";
import Router from "./router";
import AppLoader from "containers/appLoader";
import BChain from './BChain';

export default function() {
  return (
    <Theme>
      <AppLoader>
        <Router />
      </AppLoader>
    </Theme>
  );
}
