<?php


namespace controllers;


use repositories\BooksRepository;
use views\View;

class AdminController
{
    private BooksRepository $booksRepository;
    private View $view;
    private $data;

    public function __construct($view, $data)
    {
        $this->view = $view;
        $this->booksRepository = new BooksRepository();
        $this->data = $data;
    }

    public function getAll($page = 0){
        $books = $this->booksRepository->getAll($page, true);
        $this->view->putData($books);
        $this->view->send();
    }

    public function updateBook(){
        $cover = $this->data["files"]["cover"];
        $pdf = $this->data["files"]["pdf"];
        if($cover !== null){
            $uploadedCover = "/book-store-app-wrk/Book-Store-App-.wrk/static/" . $this->data["json"]->cover_path;
            if(!move_uploaded_file($this->data["files"]["cover"]['tmp_name'], $uploadedCover)){
                header('Access-Control-Allow-Origin: *');
                http_response_code(500);
                exit;
            }
        }
        $this->booksRepository->updateBook($this->data["json"]);
        $this->view->send();
    }
}