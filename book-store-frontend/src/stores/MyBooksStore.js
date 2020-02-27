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
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${URL}api/myBooks/user/${customerEmail}`);
      xhr.send();
      xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
          const response = JSON.parse(xhr.responseText)
          setBooks(response);
        }
      }
  });

  export const myBooksStore = {
    customerEmail,
    books,
    setCustomerEmail,
    setBooks
  }