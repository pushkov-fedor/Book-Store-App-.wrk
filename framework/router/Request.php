<?php

namespace router;

class Request
{
    private string $method;
    private string $path;
    private array $accepted;

    private string $controllerClass;
    private string $controllerMethod;
    private array $args;

    public function __construct()
    {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = trim($_SERVER['REQUEST_URI'], '/');
        $this->accepted = array();
        $acceptedTmp = explode(",", $_SERVER["HTTP_ACCEPT"]);
        foreach ($acceptedTmp as $key => $value){
            $tmp = explode(";", $value);
            array_push($this->accepted, $tmp[0]);
        }
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

    /**
     * @return string
     */
    public function getControllerClass(): string
    {
        return $this->controllerClass;
    }

    /**
     * @param string $controllerClass
     */
    public function setControllerClass(string $controllerClass): void
    {
        $this->controllerClass = $controllerClass;
    }

    /**
     * @return string
     */
    public function getControllerMethod(): string
    {
        return $this->controllerMethod;
    }

    /**
     * @param string $controllerMethod
     */
    public function setControllerMethod(string $controllerMethod): void
    {
        $this->controllerMethod = $controllerMethod;
    }

    /**
     * @return array
     */
    public function getArgs(): array
    {
        return $this->args;
    }

    /**
     * @param array $args
     */
    public function setArgs(array $args): void
    {
        $this->args = $args;
    }

    /**
     * @return array
     */
    public function getAccepted(): array
    {
        return $this->accepted;
    }

    /**
     * @param array $accepted
     */
    public function setAccepted(array $accepted): void
    {
        $this->accepted = $accepted;
    }
}