<?php

namespace entity;

class Book implements \JsonSerializable
{
    private string $id;
    private string $title;
    private string $author;
    private string $price;
    private string $cover_path;
    private string $book_pdf_path;
    private string $genre;
    private string $status;

    public function __construct(
        $id,
        $title,
        $author,
        $price,
        $cover_path = "cover/placeholder.png",
        $book_pdf_path = "forbidden",
        $genre = "forbidden",
        $status = "forbidden"
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->price = $price;
        $this->cover_path = $cover_path;
        $this->book_pdf_path = $book_pdf_path;
        $this->status = $status;
        $this->genre = $genre;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title): void
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author): void
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price): void
    {
        $this->price = $price;
    }

    /**
     * @return mixed
     */
    public function getCoverPath()
    {
        return $this->cover_path;
    }

    /**
     * @param mixed $cover_path
     */
    public function setCoverPath($cover_path): void
    {
        $this->cover_path = $cover_path;
    }

    /**
     * @return mixed
     */
    public function getBookPdfPath()
    {
        return $this->book_pdf_path;
    }

    /**
     * @param mixed $book_pdf_path
     */
    public function setBookPdfPath($book_pdf_path): void
    {
        $this->book_pdf_path = $book_pdf_path;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status): void
    {
        $this->status = $status;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return array(
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'price' => $this->price,
            'cover_path' => $this->cover_path,
            'book_pdf_path' => $this->book_pdf_path,
            'genre' => $this->genre,
            'status' => $this->status
        );
    }
}