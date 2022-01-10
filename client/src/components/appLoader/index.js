import React, { Children } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

export default ({ web3, drizzleStatus, children }) => {
  const classes = useStyles();

  if (web3.status === "failed") {
    return (
      // Display a web3 warning.
      <main>
        <p>
          This browser has no connection to the Ethereum network. Please use the
          Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist
          or Parity.
        </p>
      </main>
    );
  }

  if (drizzleStatus.initialized) {
    // Load the dapp.
    return Children.only(children);
  }

  return (
    // Display a loading indicator.
    <div className={classes.root}>
      <CircularProgress disableShrink />
    </div>
  );
};
