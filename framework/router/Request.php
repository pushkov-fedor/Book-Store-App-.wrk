<?php
class Request
{
    private $method;
    private $path;
    private $json_data;

    function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = $_SERVER['REQUEST_URI'];

        $body = file_get_contents('php://input');
        $this->json_data = json_decode($body, true);
    }

    /**
     * @return mixed
     */
    public function getJsonData()
    {
        return $this->json_data;
    }

    /**
     * @return mixed
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }
}