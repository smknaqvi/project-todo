import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#474B4F" },
    secondary: { main: "#61892F" },
    background: {
      default: "#222629",
    },
    text: { primary: "#FFFFFF" },
  },
  overrides: {
    MuiCard: {
      root: {
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #6B6E70 20%, #474B4F 100%)",
      },
    },
    MuiMenuItem: {
      root: {
        background: "#474B4F",
        color: "#FFFFFF",
        "&$selected": {
          background: "#474B4F",
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        background: "#474B4F",
        color: "#FFFFFF",
      },
    },
    MuiAccordionSummary: {
      root: {
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #6B6E70 20%, #474B4F 100%)",
      },
    },
    MuiAutocomplete: {
      option: {
        backgroundColor: "#474B4F",
        '&[data-focus="true"]': {
          backgroundColor: "#61892F",
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: "#6B6E70",
      },
    },
  },
});
export default theme;
