import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { convertDateFromPicker, dateToISO } from "../utils/dateUtils";

export default class DebatePage extends Component {
  componentDidMount() {
    const {
      userId,
      acsScore,
      getACS,
      getResponses,
      date,
      getDebatesFromUserIdAndDate,
      getDebatesByUserId,
    } = this.props;
    getDebatesFromUserIdAndDate(new Date(date), this.props.userId);
    if (!acsScore) {
      getACS(userId);
    }
    getDebatesByUserId(userId);
    getResponses();
  }

  handleChangedDate = (event) => {
    this.props.getDebatesFromUserIdAndDate(
      convertDateFromPicker(event.target.value),
      this.props.userId
    );
  };

  createDatePicker() {
    return (
      <div>
        <TextField
          className="game-date"
          label="Game Date"
          type="date"
          defaultValue={dateToISO(this.props.date)}
          onChange={this.handleChangedDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  }

  createDisplayPage() {
    if (this.props.hasResponded) {
      return <div> Debate View Page </div>;
    } else {
      return <div> Debate Write Page</div>;
    }
  }

  render() {
    return (
      <div>
        {this.createDatePicker()}
        {this.createDisplayPage()}
      </div>
    );
  }
}
