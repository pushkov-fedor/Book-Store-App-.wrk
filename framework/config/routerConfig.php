<?php

$router->get("api/books/all", "BooksController::get");

$router->get("api/books/page/{page}", "BooksController::get");

$router->get("api/books/all/count", "BooksController::getAllCount");

$router->get("api/books/genres", "BooksController::getGenres");

$router->get("api/myBooks/user/{email}", "BooksController::getPurchased");

$router->get("api/myBooks/get/{bookName}", "BooksController::getFile");


$router->post("api/payment/after", "PaymentController::after");

$router->post("api/payment/pay", "PaymentController::pay");


$router->get("api/admin/books", "AdminController::getAll");

$router->get("api/admin/books/page/{page}", "AdminController::getAll");

$router->post("api/admin/books/update", "AdminController::updateBook");

$router->post("api/admin/books/add", "AdminController::addBook");

$router->post("api/admin/books/delete/{id}", "AdminController::deleteBook");