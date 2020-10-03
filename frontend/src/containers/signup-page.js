import { connect } from "react-redux";
import { signup, closeError } from "../actions/signup-page";
import { toggleAuthPage } from "../actions/auth-page";

import SignupPage from "../components/signup-page.component";

const mapStateToProps = (state) => ({
  showError: state.signupPage.get("showError"),
  errorReason: state.signupPage.get("errorReason"),
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
