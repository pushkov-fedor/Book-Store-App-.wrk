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
        $uploaddir = './';
        $uploadfile = $uploaddir . basename($_FILES['file']['name']);
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
            echo "Файл корректен и был успешно загружен.\n";
        } else {
            echo "Возможная атака с помощью файловой загрузки!\n";
        }
    }
}