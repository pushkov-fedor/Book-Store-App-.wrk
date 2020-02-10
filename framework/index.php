<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/router/Router.php';

$router = new Router();

$router->get("api/view/{num}", "ViewController::showView");

$router->get("api/books/all", "BooksController::getAllBooks");

$router->get("api/books/{page}", "BooksController::getAllBooksByPage");

$router->get("api/books/all/count", "BooksController::getAllBooksCount");

$router->get("api/books/genres", "BooksController::getBookGenres");

$request = new Request();

$router->resolve($request);
