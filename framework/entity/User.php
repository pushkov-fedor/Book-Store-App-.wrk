<?php


namespace entity;


class User implements \JsonSerializable
{
    private string $username;
    private string $email;
    private string $password;

    public function __construct(string $username = "username", string $password = "password", string $email = "email@domain.com")
    {
        trim($username, " ");
        trim($email, " ");
        trim($password, " ");
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }

    public function validate($errors){
        if($this->getUsername() === ""){
            array_push($errors, "Username is empty");
        }
        if($this->getEmail() === ""){
            array_push($errors, "Email is empty");
        } elseif(filter_var($this->getEmail(), FILTER_VALIDATE_EMAIL) === false) {
            array_push($errors, "Email is invalid");

        }
        if($this->getPassword() === ""){
            array_push($errors, "Password is empty");
        }
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return array(
            'username' => $this->username,
            'email' => $this->email,
            'password' => $this->password
        );
    }
}