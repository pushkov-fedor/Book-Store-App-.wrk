import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./entity/Book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  book: Book;
  currentOperation: string = "NONE";

  constructor(
    private http: HttpClient
  ) { }

  getBooks(page: number){
    return this.http.get<Book[]>(`http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/api/admin/books/page/${page}`);
  }

  setEditBook(book: Book){
    this.book = book;
    this.setCurrentOperation("EDIT");
  }

  setCurrentOperation(operation: string){
    this.currentOperation = operation;
  }


}
