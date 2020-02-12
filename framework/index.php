<?php
//include_once $_SERVER['DOCUMENT_ROOT'].'/framework/router/Router.php';

spl_autoload_register(function($class){
    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require_once $file . '.php';
});

use router\Router, router\Request;

$router = new Router();

$router->get("api/books/all", "BooksController::getAllBooks");

$router->get("api/books/page/{page}", "BooksController::getAllBooksByPage");

$router->get("api/books/all/count", "BooksController::getAllBooksCount");

$router->get("api/books/genres", "BooksController::getBookGenres");

$request = new Request();

$router->resolve($request);
