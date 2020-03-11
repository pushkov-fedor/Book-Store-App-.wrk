import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import {Book} from "../entity/Book";
import {BookImpl} from "../entity/BookImpl";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentPage: number = 1;
  books: BookImpl[];

  constructor(
    public booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.booksService.getBooks(this.currentPage)
      .pipe(
        map((books: Book[]) => {
          return books.map((book: Book) => {
            const bookImpl = new BookImpl().fromJson(book);
            return bookImpl;
          });
        })
      )
      .subscribe(books => {
        this.books = books;
      });
  }

  setEditBook(book: BookImpl){
    this.booksService.setEditBook(book);
  }

  setAddBook(){
    this.booksService.setAddBook();
  }

  getCover(book: BookImpl): string{
    return book.getCover();
  }

}
