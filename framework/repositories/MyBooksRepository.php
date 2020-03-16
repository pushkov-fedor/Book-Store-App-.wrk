<?php


namespace repositories;


use entity\Book;

class MyBooksRepository
{
    public function save($email, $books)
    {
        /**
         * Books are saved in database!
         */
    }

    public function getPurchased($email)
    {
        $books = array();
        for ($i = 0; $i < 5; $i++) {
            $books[$i] = new Book(
                "$i + $email",
                'Stop Missing Your Life: How to be Deeply Present in an Un-Present World',
                'Cory Muscara',
                "18.39",
                $i % 2 == 0 ?
                    'https://media.ebook.de/shop/coverscans/370/37023255_9780738285313_xl.jpg' :
                    'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png'
            );
        }
        return $books;
    }

    public function getFile($fileId)
    {
        return $_SERVER["DOCUMENT_ROOT"] . "/static/books/the-old-man-and-the-sea.pdf";
    }
}