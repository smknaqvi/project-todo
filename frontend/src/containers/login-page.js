import { connect } from "react-redux";
import { login } from "../actions/login-page";
import { closeError } from "../actions/error";
import { toggleAuthPage } from "../actions/auth-page";

import LoginPage from "../components/login-page.component";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
});

const mapDispatchToProps = (dispatch) => ({
  login: (values) => {
    dispatch(login(values));
  },
  closeError: () => {
    dispatch(closeError());
  },
  togglePage: () => {
    dispatch(toggleAuthPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
