<?php


namespace repositories;


class MyBooksRepository
{
    public function save($email, $books){
        /**
        Books are saved in database!
        */
    }

    public function getPurchased($email){
        $books = array();
        for($i = 0; $i <5; $i++){
            $books[$i] = array( 'id' => "$i + $email",
                'title' => 'Stop Missing Your Life: How to be Deeply Present in an Un-Present World',
                'author' => 'Cory Muscara',
                'price' => 18.39,
                'cover' => $i % 2 == 0 ?
                    'https://media.ebook.de/shop/coverscans/370/37023255_9780738285313_xl.jpg' :
                    'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png');
        }
        return $books;
    }

    public function getFile($fileId){
        $file = $_SERVER["DOCUMENT_ROOT"] . "/database/books/the-old-man-and-the-sea.pdf";
        return $file;
    }
}