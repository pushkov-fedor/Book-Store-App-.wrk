import { action, autorun, observable, when } from 'mobx'

const books = observable([]);
const setBooks = action((updatedBooks) => {
  while (books.length > 0) books.pop();
  updatedBooks.forEach(book => books.push(book));
})

const currentPage = observable.box(1);
const setCurrentPage = action(page => currentPage.set(page));

const editedBook = observable.box(null);
const setEditedBook = action(book => editedBook.set(book));


autorun(() => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://test.com/api/admin/books/page/${currentPage}`);
  xhr.send();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
      setBooks(JSON.parse(xhr.responseText));
    }
  };
})

export const adminStore = {
  books,
  setBooks,
  currentPage,
  setCurrentPage,
  editedBook,
  setEditedBook
}