import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./entity/Book";
import {BookImpl} from "./entity/BookImpl";
import {BehaviorSubject, Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  book: BookImpl;
  lastPage: number;
  booksStream$: BehaviorSubject<Observable<Book[]>>;
  currentOperation$: BehaviorSubject<string>;

  constructor(
    private http: HttpClient
  ) {
    this.currentOperation$ = new BehaviorSubject<string>("NONE");
  }

  private getBooks(page: number){
    return this.http.get<Book[]>(`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/admin/books/page/${page}`);
  }

  subscribeToBooksStream(startPage: number){
    this.lastPage = startPage;
    this.booksStream$ = new BehaviorSubject(this.getBooks(startPage));
    return this.booksStream$;
  }

  subscribeToCurrentOperationStream(){
    return this.currentOperation$;
  }

  private sendBooksToSubscribers(){
    this.booksStream$.next(this.getBooks(this.lastPage));
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

  flushCurrentOperation(){
    this.setCurrentOperation("NONE");
  }

  private setCurrentOperation(operation: string){
    this.currentOperation$.next(operation);
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
      .subscribe(null);
    this.book = undefined;
    this.setCurrentOperation("NONE");
    timer(1000)
      .subscribe((value => this.sendBooksToSubscribers()));
  }

  deleteBook(id: string){
    this.http.post(`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/admin/books/delete/${id}`, null)
      .subscribe();
    timer(1000)
      .subscribe((value => this.sendBooksToSubscribers()));
  }

}
