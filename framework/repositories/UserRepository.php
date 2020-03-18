<?php


namespace repositories;


class UserRepository
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

    public function get($id = 0){
        return -1;
    }
}