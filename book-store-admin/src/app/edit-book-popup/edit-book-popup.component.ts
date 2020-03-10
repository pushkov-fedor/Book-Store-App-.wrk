import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import {Book} from "../entity/Book";

@Component({
  selector: 'app-edit-book-popup',
  templateUrl: './edit-book-popup.component.html',
  styleUrls: ['./edit-book-popup.component.css']
})
export class EditBookPopupComponent implements OnInit {
  book: Book;

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.book = this.booksService.book;
  }

  dismiss(event){
    if(event.target.id === "edit-book-bg"){
      this.booksService.setCurrentOperation("NONE");
    }
  }

}
