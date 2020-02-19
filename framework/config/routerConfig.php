<?php

$router->get("api/books/all", "BooksController::getAll");

$router->get("api/books/page/{page}", "BooksController::getAll");

$router->get("api/books/all/count", "BooksController::getAllCount");

$router->get("api/books/genres", "BooksController::getGenres");


$router->post("api/payment/after", "PaymentController::after");