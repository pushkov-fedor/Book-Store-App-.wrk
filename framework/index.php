<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/router/Router.php';

$router = new Router();

$router->get("/view/{num}", "ViewController::showView");

$router->get("/books/all", "BooksController::getAllBooks");

$router->get("/books/all/{page}", "BooksController::getAllBooksByPage");

$router->get("/books/all/count", "BooksController::getAllBooksCount");

$router->get("/books/genres", "BooksController::getBookGenres");

$request = new Request($_SERVER);

$router->resolve($request);
