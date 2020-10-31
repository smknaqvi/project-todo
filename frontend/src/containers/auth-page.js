import { connect } from "react-redux";
import AuthPage from "../components/auth-page.component";
import { isAuthorized } from "../utils/isAuthorized";

const mapStateToProps = (state) => ({
  showSignup: state.authPage.get("showSignup"),
  redirect: isAuthorized(),
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
