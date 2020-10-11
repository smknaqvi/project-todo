import { connect } from "react-redux";
import LogoutPage from "../components/logout-page.component";
import { logout } from "../actions/logout-page";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
