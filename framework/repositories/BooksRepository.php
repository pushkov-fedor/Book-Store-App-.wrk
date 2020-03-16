<?php

namespace repositories;

use entity\Book;
use PDO;
use PDOException;

class BooksRepository
{

    private PDO $db;

    public function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname=test', "root", "admin");
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getAll($page = 0, $admin = false)
    {
        $books = array();
        $i = 0;
        if ($admin) {
            foreach ($this->db->query("SELECT * FROM books") as $row) {
                $books[$i] = new Book(
                    $row["id"],
                    $row["title"],
                    $row["author"],
                    $row["price"],
                    $row["cover_path"],
                    $row["book_pdf_path"],
                    $row["genre"],
                    $row["status"],
                );
                $i++;
            }
        } else {
            foreach ($this->db->query("SELECT * FROM books") as $row) {
                $books[$i] = new Book($row["id"], $row["title"], $row["author"], $row["price"], $row["cover_path"]);
                $i++;
            }
        }
        return $books;
    }

    public function updateBook(Book $book)
    {
        $sql = "UPDATE books 
                SET author=?, title=?, price=? WHERE id=?";
        $this->db->prepare($sql)->execute([$book->getAuthor(), $book->getTitle(), $book->getPrice(), $book->getId()]);
    }

    public function addBook($book)
    {
        $sql = "INSERT INTO books (author, title, price, cover_path, book_pdf_path, genre, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $this->db->prepare($sql)->execute($book);
    }

    public function deleteBook($id)
    {
        $sql = "DELETE FROM books WHERE id = :id";
        $this->db->prepare($sql)->execute([":id" => $id]);
    }

    public function getAllCount()
    {
        foreach ($this->db->query("SELECT COUNT(*) FROM books") as $row) {
            return array('booksCount' => $row[0]);
        }
    }

    public function getGenres()
    {
        return array(
            'genres' =>
                array(
                    'Action and Adventure',
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
                    'Suspense/Thriller'
                )
        );
    }
}