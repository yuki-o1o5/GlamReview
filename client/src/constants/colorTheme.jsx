import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Varela", sans-serif',
  },
  palette: {
    primary: {
      main: "#23485B",
    },
    secondary: {
      main: "#e0dbe0",
    },

    custom: {
      light: "#9B3384",

      main: "#7F0858",

      dark: "#483B5F",
    },
  },
});
