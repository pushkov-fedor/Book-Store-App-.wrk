import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import {Book} from "../entity/Book";
import {BookImpl} from "../entity/BookImpl";
import {map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentPage: number = 1;
  books: BookImpl[];
  currentOperation: string;

  constructor(
    public booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.booksService.subscribeToBooksStream(this.currentPage)
      .pipe(
        switchMap(stream$ => stream$),
        map((books: Book[]) => {
          return books.map((book: Book) => {
            const bookImpl = new BookImpl().fromJson(book);
            return bookImpl;
          });
        })
      )
      .subscribe(books => {
        this.books = books;
        console.log("Pulling books");
        console.log(this.books);
      });
    this.booksService.subscribeToCurrentOperationStream()
      .subscribe(operation => this.currentOperation = operation);
  }

  setEditBook(book: BookImpl){
    this.booksService.setEditBook(book);
  }

  setAddBook(){
    this.booksService.setAddBook();
  }

  deleteBook(book: BookImpl){
    this.booksService.deleteBook(book.id);
  }

  getCover(book: BookImpl): string{
    return book.getCover();
  }

}
