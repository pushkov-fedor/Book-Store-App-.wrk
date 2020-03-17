import { action, autorun, observable, when, computed, toJS } from "mobx";
import { URL } from "../constants/Constants";

const books = observable([]);
const genres = computed(() => {
  // const gens = [];
  // toJS(books).forEach(book => {
  //   console.log(book);
  //   if (gens.find(book.genre) === undefined) {
  //     gens.push(book.genre);
  //   }
  // });
  // return gens;
  return ["A", "B", "C"];
});
const savedBooks = observable([]);
const savedBooksSnapshot = observable([]);
const currentPage = observable.box(1);
const booksCount = observable.box(0);
const booksPerPage = observable.box(16);
const showPagination = computed(() => booksCount.get() > booksPerPage.get());
const pages = computed(() => {
  if (booksCount.get() % booksPerPage.get() === 0) {
    return booksCount / booksPerPage;
  } else {
    return Math.ceil(booksCount / booksPerPage);
  }
});

const setBooks = action(updatedBooks => {
  while (books.length > 0) books.pop();
  updatedBooks.forEach(book => books.push(book));
});

const setGenres = action(updatedGenres => {
  while (genres.length > 0) genres.pop();
  updatedGenres.forEach(genre => genres.push(genre));
});

const setSavedBooks = action(savedBooksFromLS => {
  while (savedBooks.length > 0) savedBooks.pop();
  savedBooksFromLS.forEach(book => savedBooks.push(book));
});

const setSavedBooksSnapshot = action(books => {
  while (savedBooksSnapshot.length > 0) savedBooksSnapshot.pop();
  books.forEach(book => savedBooksSnapshot.push(book));
});

const setCurrentPage = action(page => currentPage.set(page));
const setBooksCount = action(count => booksCount.set(count));
const setBooksPerPage = action(perPage => booksPerPage.set(perPage));

const removeBookFromLocalStorage = action(id => {
  let filteredBooks = savedBooks.filter(book => book.id !== id);
  setSavedBooks(filteredBooks);
  localStorage.setItem("books", JSON.stringify(savedBooks));
});

const addBookToLocalStorage = action((id, cover, title, author, price) => {
  let filteredBooks = savedBooks.filter(book => book.id === id);
  if (filteredBooks.length === 0) {
    savedBooks.push({ id, cover, title, author, price });
    localStorage.setItem("books", JSON.stringify(savedBooks));
  }
});

when(
  () => savedBooks.length === 0,
  () => {
    const books = JSON.parse(localStorage.getItem("books"));
    if (books !== null) {
      setSavedBooks(books);
    }
  }
);

when(
  () => genres.length === 0,
  () => {
    fetch(`${URL}api/books/genres`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
);

when(
  () => booksCount.get() === 0,
  () => {
    fetch(`${URL}api/books/all/count`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => setBooksCount(response.booksCount))
      .catch(error => console.log(error));
  }
);

autorun(() => {
  fetch(`${URL}api/books/page/${currentPage}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => setBooks(response))
    .catch(error => console.log(error));
});

const isBookInShoppingCart = id => {
  return Boolean(toJS(savedBooks).find(book => book.id === id));
};

export const bookStore = {
  books,
  genres,
  booksCount,
  savedBooks,
  savedBooksSnapshot,
  currentPage,
  booksPerPage,
  pages,
  setBooks,
  setSavedBooks,
  setSavedBooksSnapshot,
  setCurrentPage,
  setBooksCount,
  setBooksPerPage,
  setGenres,
  removeBookFromLocalStorage,
  addBookToLocalStorage,
  showPagination,
  isBookInShoppingCart
};
