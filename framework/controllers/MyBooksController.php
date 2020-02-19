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

    public function get($email){
        $books = $this->myBooksRepository->get($email);
        $this->view->putData($books);
        $this->view->send();
    }
}