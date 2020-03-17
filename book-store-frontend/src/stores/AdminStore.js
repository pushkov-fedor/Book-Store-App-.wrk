import { action, autorun, computed, observable, toJS, when } from "mobx";
import { URL } from "../constants/Constants";

const books = observable([]);
const setBooks = action(updatedBooks => {
  while (books.length > 0) books.pop();
  updatedBooks.forEach(book => books.push(book));
});

const currentPage = observable.box(1);
const setCurrentPage = action(page => currentPage.set(page));

const book = observable.box(null);
const setBook = action(book => book.set(book));

const cover = observable.box(null);
const setCover = action(newCover => cover.set(newCover));

const uploadedCoverAsDataUrlSrc = observable.box("");
const setUploadedCoverAsDataUrlSrc = action(url =>
  uploadedCoverAsDataUrlSrc.set(url)
);

const bookPdf = observable.box(null);
const setBookPdf = action(pdf => bookPdf.set(pdf));

const CURRENT_OPERATION = observable.box("NONE");
const setCurrentOperation = action(operation =>
  CURRENT_OPERATION.set(operation)
);
const setCurrentOperationAdd = action(() => setCurrentOperation("ADD"));
const setCurrentOperationEdit = action(() => setCurrentOperation("EDIT"));
const setCurrentOperationNone = action(() => setCurrentOperation("NONE"));

const uploadFile = action(event => {
  switch (event.target.id) {
    case "cover":
      setCover(event.target.files[0]);
      break;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
    setUploadedCoverAsDataUrlSrc(reader.result);
  };
  reader.readAsDataURL(cover.get());
});

const sendFile = action(() => {
  const data = new FormData();
  const json = toJS(book.get());
  json.price = Number(Number(json.price).toFixed(2));
  data.append("cover", cover.get());
  data.append("json", JSON.stringify(json));
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${URL}api/admin/books/update`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      setBook(null);
    }
  };
  xhr.send(data);
});

const dismissPopup = action(event => {
  if (
    event === undefined ||
    event.target.id === "edit-book-bg" ||
    event.target.id == "add-book-bg"
  ) {
    setCurrentOperationNone();
    setBook(null);
  }
});

// autorun(() => {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", `${URL}api/admin/books/page/${currentPage}`);
//   xhr.send();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//       setBooks(JSON.parse(xhr.responseText));
//     }
//   };
// });

export const adminStore = {
  books,
  setBooks,
  currentPage,
  setCurrentPage,
  book,
  setBook,
  cover,
  setCover,
  uploadedCoverAsDataUrlSrc,
  setUploadedCoverAsDataUrlSrc,
  bookPdf,
  setBookPdf,
  uploadFile,
  sendFile,
  dismissPopup,
  CURRENT_OPERATION,
  setCurrentOperationAdd,
  setCurrentOperationEdit,
  setCurrentOperationNone
};
