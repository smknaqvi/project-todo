import { connect } from "react-redux";
import OpenCourtPage from "../components/opencourt-page.component";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtPage);
