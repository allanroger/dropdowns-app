import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#008000',
      light: '#008000',
      dark: '#000',
    },
    secondary: {
      main: '#008000',
      light: '#008000',
      dark: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
export default theme;