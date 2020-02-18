import { action, autorun, observable, when } from 'mobx'

  const books = observable([]);
  const genres = observable([]);
  const savedBooks = observable([]);
  const currentPage = observable.box(1);
  const booksCount = observable.box(0);
  const booksPerPage = observable.box(16);

  const nameOnCard = observable.box("John Doe");
  const cardNumber = observable.box("XXXX    XXXX    XXXX    XXXX");
  const expirationMonth = observable.box("01");
  const expirationYear = observable.box("2024");
  const cvv = observable.box("XXX");
  const isPaymentInfoValid = observable.box(false);
  const customerEmail = observable.box("")

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

  const setNameOnCard = action(name => nameOnCard.set(name));
  const setCardNumber = action(number => cardNumber.set(number));
  const setExpirationMonth = action(month => expirationMonth.set(month));
  const setExpirationYear = action(year => expirationYear.set(year));
  const setCVV = action(userCVV => cvv.set(userCVV));

  const setCustomerEmail = action(email => customerEmail.set(email));

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
      const books = JSON.parse(localStorage.getItem('books'))
      if (books !== null) setSavedBooks(books);
  })

  when(() => genres.length === 0,
    () => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/books/genres');
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
      xhr.open('GET', 'http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/books/all/count');
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
    xhr.open('GET', `http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/books/page/${currentPage}`);
    xhr.send();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE &&  xhr.status === 200){
        setBooks(JSON.parse(xhr.responseText));
      }
    };
  })

  autorun(() => {
      let isValid = true;
      if(nameOnCard.length === 0) {
        isValid = false;
      }

      const splittedCardNumber = cardNumber.split("    ");
      const reduced = splittedCardNumber.reduce((accumulator, current) =>  accumulator+= Number(current), 0)
      if(isNaN(reduced)) isValid = false;
      if(isNaN(Number(cvv))) isValid = false;
      isPaymentInfoValid.set(isValid);
    }
  )

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
    addBookToLocalStorage,
    nameOnCard,
    cardNumber,
    expirationMonth,
    expirationYear,
    cvv,
    isPaymentInfoValid,
    customerEmail,
    setNameOnCard,
    setCardNumber,
    setExpirationMonth,
    setExpirationYear,
    setCVV,
    setCustomerEmail
  }
