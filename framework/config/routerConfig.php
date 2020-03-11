<?php

$router->get("api/books/all", "BooksController::getAll");

$router->get("api/books/page/{page}", "BooksController::getAll");

$router->get("api/books/all/count", "BooksController::getAllCount");

$router->get("api/books/genres", "BooksController::getGenres");


$router->get("api/myBooks/user/{email}", "MyBooksController::getPurchased");

$router->get("api/myBooks/get/{bookName}", "MyBooksController::getFile");


$router->post("api/payment/after", "PaymentController::after");


$router->get("api/admin/books", "AdminController::getAll");

$router->get("api/admin/books/page/{page}", "AdminController::getAll");

$router->post("api/admin/books/update", "AdminController::updateBook");
$router->post("api/admin/books/add", "AdminController::addBook");