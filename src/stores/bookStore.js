import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});
function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}
class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }
  addBook = async newBook => {
    try {
      const res = await instance.post("/api/books/", newBook);
      const book = res.data;
      this.books.unshift(book);
      this.errors = null;
    } catch (err) {
      this.errors = errToArray(err.response.data);
    }
  };
  getBookById = id => this.books.find(book => +book.id === +id);
  getBooksByAuthorId = authorId => {
    let temp = [];
    this.books.forEach(book => {
      book.authors.forEach(author => {
        if (author.id === authorId) {
          temp.push(book);
        }
      });
    });
    return temp;
  };
  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
