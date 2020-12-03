import { createMuiTheme } from "@material-ui/core/styles";

const bracketStyle = createMuiTheme({
  palette: {
    bracket: { backgroundColor: "#86C232", color: "#FFFFFF" },
    selector: { backgroundColor: "#474B4F", color: "#FFFFFF" },
    secondary: { main: "#474B4F" },
    text: { primary: "#FFFFFF" },
  },
});

export default bracketStyle;
