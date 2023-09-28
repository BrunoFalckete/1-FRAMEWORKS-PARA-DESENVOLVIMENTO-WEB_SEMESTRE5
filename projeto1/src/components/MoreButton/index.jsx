import { Component } from "react";
import "./style.css";

export class MoreButton extends Component {
  render() {
    const { title, action } = this.props;
    return (
      <button className="button" onClick={action}>
        {title}
      </button>
    );
  }
}
