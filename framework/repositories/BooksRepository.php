<?php

namespace repositories;
use PDO, PDOException;

class BooksRepository
{

    private PDO $db;

    public function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=test', "root", "admin");
        } catch (PDOException $e){
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getAll($page = 0){
        $books = array();
        $i = 0;
        foreach ($this->db->query("SELECT * FROM books") as $row) {
            $books[$i] = array(
                'id' => $row["id"],
                'title' => $row["title"],
                'author' => $row["author"],
                'price' => $row["price"],
                'cover_path' => $row["cover_path"]
            );
            $i++;
        }
        return $books;
    }

    public function getAllCount(){
        foreach ($this->db->query("SELECT COUNT(*) FROM books") as $row){
            return array('booksCount' => $row[0]);
        }
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