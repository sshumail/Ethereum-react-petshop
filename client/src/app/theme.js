import React from "react";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

let theme = createTheme({});

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
