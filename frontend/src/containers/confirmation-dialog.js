import { connect } from "react-redux";
import { closeConfirmationDialog } from "../actions/confirmation-dialog";
import ConfirmationDialog from "../components/confirmation-dialog.component";

const mapStateToProps = (state) => ({
  showConfirmationDialog: state.confirmationDialog.get(
    "showConfirmationDialog"
  ),
  dialogMessage: state.confirmationDialog.get("dialogMessage"),
  dialogTitle: state.confirmationDialog.get("dialogTitle"),
  onAcceptChange: state.confirmationDialog.get("onAcceptChange"),
  onDeclineChange: state.confirmationDialog.get("onDeclineChange"),
});

const mapDispatchToProps = (dispatch) => ({
  closeConfirmationDialog: () => dispatch(closeConfirmationDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog);
