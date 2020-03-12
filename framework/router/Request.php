<?php

namespace router;

class Request
{
    private $method;
    private $path;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = trim($_SERVER['REQUEST_URI'], '/');
    }

    /**
     * @return mixed
     */
    public function getData($type)
    {
        if ($type == "multipart/form-data") {
            return array("files" => $_FILES, "json" => json_decode($_POST["json"]));
        } else {
            return json_decode(file_get_contents('php://input'), true);
        }
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