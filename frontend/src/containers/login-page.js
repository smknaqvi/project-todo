import { connect } from "react-redux";
import { toggleAuthPage } from "../actions/auth-page";
import LoginPage from "../components/login-page.component";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  togglePage: () => {
    dispatch(toggleAuthPage());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
