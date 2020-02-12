<?php

namespace controllers;

use repositories\BooksRepository;

class BooksController
{
    private BooksRepository $booksRepository;

    public function __construct()
    {
        $this->booksRepository = new BooksRepository();
    }

    public function getAll($page = 0){
        $books = $this->booksRepository->getAll($page);
        header('Access-Control-Allow-Origin: *');
        echo json_encode($books);
    }

    public function getAllCount(){
        $booksCount = $this->booksRepository->getAllCount();
        header('Access-Control-Allow-Origin: *');
        echo json_encode($booksCount);
    }

    public function getGenres(){
        $genres = $this->booksRepository->getGenres();
        header('Access-Control-Allow-Origin: *');
        echo json_encode($genres);
    }
}