<?php

namespace repositories;

class BooksRepository
{
    public function getAll($page = 0){
        $books = array();
        if($page == 0) {
            for ($i = 0; $i < 50; $i++) {
                $books[$i] = array(
                    'id' => uniqid(),
                    'title' => 'Stop Missing Your Life: How to be Deeply Present in an Un-Present World',
                    'author' => 'Cory Muscara',
                    'price' => 18.39,
                    'cover' => 'https://media.ebook.de/shop/coverscans/370/37023255_9780738285313_xl.jpg'
                );
            }
        } else {
            $booksNumber = $page == 4 ? 2 : 16;
            for($i = 0; $i < $booksNumber; $i++){
                $books[$i] = array( 'id' => "$i + $page",
                    'title' => 'Stop Missing Your Life: How to be Deeply Present in an Un-Present World',
                    'author' => 'Cory Muscara',
                    'price' => 18.39,
                    'cover' => $i % 2 == 0 ?
                        'https://media.ebook.de/shop/coverscans/370/37023255_9780738285313_xl.jpg' :
                        'https://about.canva.com/wp-content/uploads/sites/3/2015/01/art_bookcover.png');
            }
        }
        return $books;
    }

    public function getAllCount(){
        return array('booksCount' => 50);
    }

    public function getGenres(){
        return array('genres' =>
            array('Action and Adventure',
            'Anthology',
            'Classic',
            'Comic and Graphic Novel',
            'Crime and Detective',
            'Drama',
            'Fable',
            'Fairy Tale',
            'Fan-Fiction',
            'Fantasy',
            'Historical Fiction',
            'Horror',
            'Humor',
            'Legend',
            'Magical Realism',
            'Mystery',
            'Mythology',
            'Realistic Fiction',
            'Romance',
            'Satire',
            'Science Fiction (Sci-Fi)',
            'Short Story',
            'Suspense/Thriller'));
    }
}