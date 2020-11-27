import { connect } from "react-redux";
import { closeError } from "../actions/error";
import { closeSuccess } from "../actions/success";
import AlertSnackbar from "../components/alert-snackbar.component";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});

const mapDispatchToProps = (dispatch) => ({
  closeError: () => {
    dispatch(closeError());
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSnackbar);
