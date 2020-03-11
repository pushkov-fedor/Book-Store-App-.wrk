import {Book} from "./Book";

export class BookImpl implements Book{
  author: string;
  book_pdf_path: string;
  cover_path: string;
  id: string;
  price: string;
  status: string;
  title: string;
  uploadedBookPdf: File;
  uploadedCoverAsDataUrl: string;
  uploadedCover: File;

  getCover(): string {
    if(this.uploadedCover === undefined){
      return `http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/static/${this.cover_path}`;
    } else {
      return this.uploadedCoverAsDataUrl;
    }
  }

  fromJson(book: Book): BookImpl {
    this.author = book.author;
    this.book_pdf_path = book.book_pdf_path;
    this.cover_path = book.cover_path;
    this.id = book.id;
    this.price = book.price;
    this.status = book.status;
    this.title = book.title;
    return this;
  }

}
