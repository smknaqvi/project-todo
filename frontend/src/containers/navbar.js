import { connect } from "react-redux";
import Navbar from "../components/navbar.component";

const mapStateToProps = (state) => ({
  username: state.auth.get("username"),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
