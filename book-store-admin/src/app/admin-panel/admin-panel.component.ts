import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import {Book} from "../entity/Book";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  currentPage: number = 1;
  books: Book[];

  constructor(
    public booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.booksService.getBooks(this.currentPage)
      .subscribe(books => this.books = books);
  }

  setEditBook(book: Book){
    this.booksService.setEditBook(book);
  }

}
