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

    public function get(User $user) : ?User{
        $username = $user->getUsername();
        $sql = "SELECT * FROM users WHERE username=$username";
        $userFromDb = $this->db->query($sql)->fetch();

        if($userFromDb === false){
            return null;
        } else {
            $usernameDb = $userFromDb["username"];
            $passwordDb = $userFromDb["password"];
            $emailDb = $userFromDb["email"];
            return new User($usernameDb, $passwordDb, $emailDb);
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