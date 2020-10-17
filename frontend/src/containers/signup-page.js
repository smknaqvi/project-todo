import { connect } from "react-redux";
import { signup } from "../actions/signup-page";
import { closeError } from "../actions/error";
import { toggleAuthPage } from "../actions/auth-page";

import SignupPage from "../components/signup-page.component";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
});

const mapDispatchToProps = (dispatch) => ({
  signup: (values) => {
    dispatch(signup(values));
  },
  closeError: () => {
    dispatch(closeError());
  },
  togglePage: () => {
    dispatch(toggleAuthPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
