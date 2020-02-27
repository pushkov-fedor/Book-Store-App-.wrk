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
            $uploadedCover = "/vagrant_data/wrk_intern2/static/" . $this->data["json"]->cover_path;
            move_uploaded_file($this->data["files"]["cover"]['tmp_name'], $uploadedCover);
        }
        $this->booksRepository->updateBook($this->data["json"]);
        $this->view->send();
    }
}