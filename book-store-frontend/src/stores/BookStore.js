import { action, autorun, observable, when } from 'mobx'
import {URL} from '../constants/Constants'

  const books = observable([]);
  const genres = observable([]);
  const savedBooks = observable([]);
  const currentPage = observable.box(1);
  const booksCount = observable.box(0);
  const booksPerPage = observable.box(16);

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
  })

  const setCurrentPage = action(page => currentPage.set(page));
  const setBooksCount = action(count => booksCount.set(count));
  const setBooksPerPage = action(perPage => booksPerPage.set(perPage));

  const removeBookFromLocalStorage = action(id => {
    let filteredBooks = savedBooks.filter(book => book.id !== id);
    setSavedBooks(filteredBooks);
    localStorage.setItem('books', JSON.stringify(savedBooks));
  });

  const addBookToLocalStorage = action((id, cover, title, author, price) => {
    let filteredBooks = savedBooks.filter(book => book.id === id);
    if(filteredBooks.length === 0) {
      savedBooks.push({id, cover, title, author, price});
      localStorage.setItem('books', JSON.stringify(savedBooks));
    }
  })

  when(() => savedBooks.length === 0,
    () => {
      console.log("when savedBooks.length === 0")
      const books = JSON.parse(localStorage.getItem('books'))
      if (books !== null) setSavedBooks(books);
  })

  when(() => genres.length === 0,
    () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${URL}api/books/genres`);
      xhr.send();
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
          const response = JSON.parse(xhr.responseText)
          setGenres(response.genres);
        }
      }
  })

  when(() => booksCount.get() === 0,
    () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${URL}api/books/all/count`);
      xhr.send();
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          setBooksCount(response.booksCount);
        }
      }
    })

  autorun(() => {
    console.log('getting books');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${URL}api/books/page/${currentPage}`);
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
        setBooks(JSON.parse(xhr.responseText));
      }
    };
  })

  export const bookStore = {
    books,
    genres,
    booksCount,
    savedBooks,
    currentPage,
    booksPerPage,
    setBooks,
    setSavedBooks,
    setCurrentPage,
    setBooksCount,
    setBooksPerPage,
    setGenres,
    removeBookFromLocalStorage,
    addBookToLocalStorage
  }
