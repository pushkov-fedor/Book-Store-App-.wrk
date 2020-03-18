<?php


namespace repositories;


use entity\User;
use PDO;

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

    public function get($login) : ?User{
        $sql = "SELECT * FROM users WHERE username=$login";
        $user = $this->db->query($sql)->fetch();

        foreach ($user as $key => $value) {
            if (!is_int($key)) {
                unset($user[$key]);
            }
        }

        if($user === false){
            return null;
        } else {
            return new User(...$user);
        }
    }

    public function save(User $user){
        $user->setPassword(md5($user->getPassword()));
        $sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
        $tmp = $user->jsonSerialize();
        $this->db->prepare($sql)->execute([...array_values($tmp)]);
        return $user;
    }
}