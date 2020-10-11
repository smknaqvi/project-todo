import { connect } from "react-redux";
import AuthPage from "../components/auth-page.component";

const mapStateToProps = (state) => ({
  showSignup: state.authPage.get("showSignup"),
  redirect: state.auth.get("username") !== null,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
