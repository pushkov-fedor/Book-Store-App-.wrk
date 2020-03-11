import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./entity/Book";
import {BookImpl} from "./entity/BookImpl";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  book: BookImpl;
  currentOperation: string = "NONE";

  constructor(
    private http: HttpClient
  ) { }

  getBooks(page: number){
    return this.http.get<Book[]>(`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/admin/books/page/${page}`);
  }

  setEditBook(book: BookImpl){
    this.book = book;
    this.setCurrentOperation("EDIT");
  }

  setAddBook() {
    const placeholder: Book = {
      author: "",
      book_pdf_path: "",
      cover_path: "covers/placeholder.png",
      id: "",
      price: "",
      status: "Moderating",
      title: ""
    };
    this.book = new BookImpl().fromJson(placeholder);
    this.setCurrentOperation("ADD");
  }

  setCurrentOperation(operation: string){
    this.currentOperation = operation;
  }

  uploadCover(file){
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.book.uploadedCover = file;
      if (typeof reader.result === "string") {
        this.book.uploadedCoverAsDataUrl = reader.result;
      } else {
        this.book.uploadedCoverAsDataUrl = "https://miro.medium.com/max/978/1*pUEZd8z__1p-7ICIO1NZFA.png";
      }
    };
    reader.readAsDataURL(file);
  }

  uploadBookPdf(file){
    this.book.uploadedBookPdf = file;
  }

  saveBook(method: string){
    const data = new FormData();
    data.append('cover', this.book.uploadedCover);
    data.append('pdf', this.book.uploadedBookPdf);
    data.append('json', JSON.stringify((<Book>this.book)));
    this.http.post(`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/admin/books/${method}`, data)
      .subscribe((obj) => console.log(obj));
    this.book = undefined;
    this.setCurrentOperation("NONE");
  }

}
