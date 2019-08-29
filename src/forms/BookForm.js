import React, { Component } from "react";
import { observer } from "mobx-react";
import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors: [this.props.author.id]
  };

  submitBook = async event => {
    event.preventDefault();
    console.log([this.state]);
    await bookStore.addBook(this.state);
    if (!bookStore.errors) {
      this.props.closeModal();
    }
  };
  formHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              onChange={this.formHandler}
              type="text"
              className="form-control"
              name="title"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input
              onChange={this.formHandler}
              type="text"
              className="form-control"
              name="color"
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
export default observer(BookForm);
