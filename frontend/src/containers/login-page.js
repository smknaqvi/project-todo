import { connect } from "react-redux";
import { login } from "../actions/login-page";
import { toggleAuthPage } from "../actions/auth-page";

import LoginPage from "../components/login-page.component";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  login: (values) => {
    dispatch(login(values));
  },
  togglePage: () => {
    dispatch(toggleAuthPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
