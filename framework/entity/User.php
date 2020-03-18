<?php


namespace entity;


class User implements \JsonSerializable
{
    private string $username;
    private string $email;
    private string $password;

    public function __construct(string $username, string $email, string $password)
    {
        trim($username, " ");
        trim($email, " ");
        trim($password, " ");
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
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