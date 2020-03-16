<?php


namespace controllers;


use repositories\MyBooksRepository;
use views\View;

class MyBooksController
{
    private MyBooksRepository $myBooksRepository;
    private View $view;

    public function __construct($view)
    {
        $this->view = $view;
        $this->myBooksRepository = new MyBooksRepository();
    }

    public function getPurchased($email)
    {
        $books = $this->myBooksRepository->getPurchased($email);
        $this->view->putData($books);
        $this->view->send();
    }

    public function getFile($fileId)
    {
        $file = $this->myBooksRepository->getFile($fileId);
        if (file_exists($file)) {
            $this->view->putData($file);
            $this->view->send();
        } else {
            $this->view->error(500);
        }
    }
}