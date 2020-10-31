import { connect } from "react-redux";
import Navbar from "../components/navbar.component";
import { isAuthorized } from "../utils/isAuthorized";

const mapStateToProps = (state) => ({
  isAuthorized: isAuthorized(),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
