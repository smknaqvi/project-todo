import { connect } from "react-redux";
import { signup } from "../actions/signup-page";
import { toggleAuthPage } from "../actions/auth-page";

import SignupPage from "../components/signup-page.component";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  signup: (values) => {
    dispatch(signup(values));
  },
  togglePage: () => {
    dispatch(toggleAuthPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
