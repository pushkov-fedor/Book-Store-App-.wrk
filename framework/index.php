<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/router/Router.php';

$router = new Router();

$router->get("/view/{num}", "ViewController::showView");

$router->get("/books/all", "BooksController::getAllBooks");

$request = new Request($_SERVER);

$router->resolve($request);
