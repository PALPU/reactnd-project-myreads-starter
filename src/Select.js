import React, { Component } from "react";
import PropTypes from "prop-types";
class Select extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    updateShelves: PropTypes.func.isRequired,
  };

  render() {
    const { shelf, options, updateShelves } = this.props;
    return (
      <select
        defaultValue={shelf === undefined ? "none" : shelf}
        onChange={updateShelves}
      >
        <option value="move" disabled>
          Move to...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}
export default Select;
