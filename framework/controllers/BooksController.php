<?php

namespace controllers;

use repositories\BooksRepository;
use views\View;

class BooksController
{
    private BooksRepository $booksRepository;
    private View $view;

    public function __construct($view)
    {
        $this->view = $view;
        $this->booksRepository = new BooksRepository();
    }

    public function get($page = 0)
    {
        $books = $this->booksRepository->getAll($page);
        $this->view->putData($books);
        $this->view->send();
    }

    public function getAllCount()
    {
        $booksCount = $this->booksRepository->getAllCount();
        $this->view->putData($booksCount);
        $this->view->send();
    }

    public function getGenres()
    {
        $genres = $this->booksRepository->getGenres();
        $this->view->putData($genres);
        $this->view->send();
    }

    public function getPurchased($email)
    {
        $books = $this->booksRepository->getPurchased($email);
        $this->view->putData($books);
        $this->view->send();
    }

    public function getFile($fileId)
    {
        $file = $this->booksRepository->getFile($fileId);
        if (file_exists($file)) {
            $this->view->putData($file);
            $this->view->send();
        } else {
            $this->view->error(500);
        }
    }
}