<?php


namespace controllers;


use entity\Book;
use repositories\BooksRepository;
use router\Request;
use views\View;

class AdminController
{
    private BooksRepository $booksRepository;
    private View $view;
    private Request $request;

    public function __construct($view, $data)
    {
        $this->view = $view;
        $this->booksRepository = new BooksRepository();
        $this->request = $data;
    }

    public function getAll($page = 0)
    {
        $books = $this->booksRepository->getAll($page, true);
        $this->view->putData($books);
        $this->view->send();
    }

    public function updateBook()
    {
        $cover = $this->request->getData()["files"]["cover"];
        $pdf = $this->request->getData()["files"]["pdf"];
        if ($cover !== null) {
            $uploadedCover = "/book-store-app-wrk/Book-Store-App-.wrk/static/" . $this->request->getData()["json"]->cover_path;
            if (!move_uploaded_file($this->request->getData()["files"]["cover"]['tmp_name'], $uploadedCover)) {
                header('Access-Control-Allow-Origin: *');
                http_response_code(500);
                exit;
            }
        }
        $json = $this->request->getData()["json"];
        $book = new Book($json->id, $json->author, $json->title, $json->price);
        $this->booksRepository->updateBook($book);
        $this->view->send();
    }

    public function addBook()
    {
        $cover = $this->request->getData()["files"]["cover"];
        $pdf = $this->request->getData()["files"]["pdf"];

        $uniqueName = uniqid();
        $this->request->getData()["json"]->cover_path = "covers/$uniqueName.png";
        $this->request->getData()["json"]->book_pdf_path = "books/$uniqueName.pdf";
        if ($cover !== null) {
            $uploadedCover = "/book-store-app-wrk/Book-Store-App-.wrk/static/" . $this->request->getData()["json"]->cover_path;
            if (!move_uploaded_file($this->request->getData()["files"]["cover"]['tmp_name'], $uploadedCover)) {
                header('Access-Control-Allow-Origin: *');
                http_response_code(500);
                exit;
            }
        }
        if ($pdf !== null) {
            $uploadedBookPdf = "/book-store-app-wrk/Book-Store-App-.wrk/static/" . $this->request->getData()["json"]->book_pdf_path;
            if (!move_uploaded_file($this->request->getData()["files"]["pdf"]['tmp_name'], $uploadedBookPdf)) {
                header('Access-Control-Allow-Origin: *');
                http_response_code(500);
                exit;
            }
        }
        $json = $this->request->getData()["json"];
        $book = new Book($json->id, $json->author, $json->title, $json->price, $json->cover_path, $json->book_pdf_path, "Classic", $json->status);
        $this->booksRepository->addBook($book);
        $this->view->send();
    }

    public function deleteBook($id)
    {
        $this->booksRepository->deleteBook($id);
        $this->view->send();
    }
}