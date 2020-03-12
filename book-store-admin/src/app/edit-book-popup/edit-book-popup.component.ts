import {Component, OnInit} from '@angular/core';
import {BooksService} from "../books.service";
import {BookImpl} from "../entity/BookImpl";
import {Book} from "../entity/Book";

@Component({
  selector: 'app-edit-book-popup',
  templateUrl: './edit-book-popup.component.html',
  styleUrls: ['./edit-book-popup.component.css']
})
export class EditBookPopupComponent implements OnInit {
  book: BookImpl;

  constructor(
    public booksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.book = this.booksService.book;
  }

  dismiss(event){
    if(event.target.id === "edit-book-bg"){
      this.booksService.flushCurrentOperation();
    }
  }

  handleFileInput(event){
    switch (event.target.id) {
      case "cover":
        this.booksService.uploadCover(event.target.files[0]);
    }
  }

  submitForm(){
    this.book.price = String(Number(this.book.price).toFixed(2));
    this.booksService.saveBook("update");
  }

  getCover(){
    return this.book.getCover();
  }

}
