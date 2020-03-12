import { action, observable, when } from 'mobx'
import {URL} from '../constants/Constants'

  const customerEmail = observable.box("");
  const setCustomerEmail = function(email){
    when(() => customerEmail.get() === "",
      () => {
        customerEmail.set(email)
      });
  }

  const books = observable([]);
  const setBooks = action(updatedBooks => {
    while (books.length > 0) books.pop();
    updatedBooks.forEach(book => books.push(book));
  });


  when(() => customerEmail.get() !== "",
    () => {
      fetch(`${URL}api/myBooks/user/${customerEmail}`)
        .then(response => response.json())
        .then(response => setBooks(response))
        .catch(error => console.log(error));
  });

  export const myBooksStore = {
    customerEmail,
    books,
    setCustomerEmail,
    setBooks
  }