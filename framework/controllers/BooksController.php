<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/repositories/BooksRepository.php';

class BooksController
{
    private BooksRepository $booksRepository;

    function __construct()
    {
        $this->booksRepository = new BooksRepository();
    }

    public function getAllBooks(){
        $books = $this->booksRepository->getAllBooks();
        header('Access-Control-Allow-Origin: *');
        echo json_encode($books);
    }

    public function getAllBooksByPage($page){
        $books = $this->booksRepository->getAllBooksByPage($page);
        header('Access-Control-Allow-Origin: *');
        echo json_encode($books);
    }

    public function getAllBooksCount(){
        $booksCount = $this->booksRepository->getAllBooksCount();
        header('Access-Control-Allow-Origin: *');
        echo json_encode($booksCount);
    }

    public function getBookGenres(){
        $genres = $this->booksRepository->getBookGenres();
        header('Access-Control-Allow-Origin: *');
        echo json_encode($genres);
    }
}