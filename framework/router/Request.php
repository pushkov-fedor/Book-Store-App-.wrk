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

    private $data;

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

        $this->pullData($this->getMethod());
    }

    /**
     * @param $method
     * @return mixed
     */
    private function pullData($method)
    {
        if($method === "POST"){
            foreach ($this->getAccepted() as $key => $value){
                switch ($value){
                    case "multipart/form-data":
                        $this->data = array("files" => $_FILES, "json" => json_decode($_POST["json"]));
                        return;
                    case 'application/json':
                        $this->data = json_decode(file_get_contents('php://input'), true);
                        return;
                }
            }
        } else {
            $this->data = null;
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

    /**
     * @return array
     */
    public function getData(): array
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData(array $data): void
    {
        $this->data = $data;
    }
}