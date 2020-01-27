<?php


class BooksRepository
{
    public function getAllBooks(){
        $books = array();
        for($i = 0; $i < 50; $i++){
            $books[$i] = array('title' => 'Stop Missing Your Life: How to be Deeply Present in an Un-Present World',
                'author' => 'Cory Muscara',
                'price' => 18.39,
                'cover' => 'https://media.ebook.de/shop/coverscans/370/37023255_9780738285313_xl.jpg');
        }
        return $books;
    }

    public function test(){
        return 0;
    }
}