<?php

namespace router;

use controllers\AdminController;
use controllers\BooksController;
use controllers\MyBooksController;
use controllers\PaymentController;
use views\ViewApplicationJson;
use views\ViewMultipartFormData;

class Router
{
    private array $get_resolvers;
    private array $post_resolvers;
    private Request $request;

    public function __construct()
    {
        $this->request = new Request();
        $this->get_resolvers = array();
        $this->post_resolvers = array();
    }

    public function get($path, $resolver)
    {
        $this->get_resolvers[$path] = $resolver;
    }

    public function post($path, $resolver)
    {
        $this->post_resolvers[$path] = $resolver;
    }

    public function resolve()
    {
        $method = $this->request->getMethod();
        $path = $this->request->getPath();

        switch ($method) {
            case "GET":
                $this->resolvePath($path, $this->get_resolvers);
                break;
            case "POST":
                $this->resolvePath($path, $this->post_resolvers);
                break;
            case "OPTIONS":
                header("Access-Control-Allow-Origin: *");
                header("Access-Control-Allow-Headers: Accept, Content-Type");
                return;
        }
        $class = "controllers\\".$this->request->getControllerClass();
        $method = $this->request->getControllerMethod();
        $view = "views\\".$this->getView($this->request->getAccepted());

        $this->execute($class, $method, $view, $this->request->getArgs(), $this->request);
    }

    private function execute(string $class, string $method, string $view, array $args, $request){
        (new $class(new $view(), $request))->$method(...$args);
    }

    private function resolvePath($requestPath, $resolvers)
    {
        $result = array();
        foreach ($resolvers as $route => $resolver) {
            if ($route == $requestPath) {
                $classAndMethod = explode("::", $resolver);
                $this->request->setControllerClass($classAndMethod[0]);
                $this->request->setControllerMethod($classAndMethod[1]);
                $this->request->setArgs(array());
                return;
            }

            $matches = 0;
            $args = array();
            $trimmedRoute = trim($route, "/");
            $trimmedRequest = trim($requestPath, "/");
            $explodedRoute = explode("/", $trimmedRoute);
            $explodedRequest = explode("/", $trimmedRequest);

            for ($i = 0; $i < count($explodedRequest); $i++) {
                if (count($explodedRoute) != count($explodedRequest)) {
                    $result[$route] = array($matches, $args);
                    break;
                }

                if ($explodedRoute[$i] == $explodedRequest[$i]) {
                    $matches++;
                    continue;
                }

                $trimmed = trim($explodedRoute[$i], "{");
                $trimmed = trim($trimmed, "}");

                if (strlen($trimmed) == strlen($explodedRoute[$i]) - 2) {
                    $param = $explodedRequest[$i];
                    $matches++;
                    $args[count($args)] = $param;
                } else {
                    break;
                }
            }
            $result[$route] = array($matches, $args);
        }

        $matchedRoute = $this->getMaxMatchedRoute($result);
        if ($matchedRoute == null) {
            header("HTTP/1.0 404 Not Found");
            exit;
        } else {
            $args = $result[$matchedRoute][1];

            $resolver = $resolvers[$matchedRoute];
            $classAndMethod = explode("::", $resolver);
            $this->request->setControllerClass($classAndMethod[0]);
            $this->request->setControllerMethod($classAndMethod[1]);
            $this->request->setArgs($args);
        }
    }

    private function getView($accepted)
    {
        $views = array(
            "application/json" => "ViewApplicationJson",
            "text/html" => "ViewApplicationJson",
            "*/*" => "ViewApplicationJson",
            "multipart/form-data" => "ViewMultipartFormData",
            "error" => "ViewError"
        );
        foreach ($accepted as $key => $value){
            if(array_key_exists($value, $views)) {
                return $views[$value];
            }
        }
        return $views["error"];
    }

    private function createClassByName($className, $arg1, $arg2)
    {
        switch ($className) {
            case "BooksController":
                return new BooksController($arg1);
                break;
            case "AdminController":
                return new AdminController($arg1, $arg2);
                break;
            case "PaymentController":
                return new PaymentController($arg1, $arg2);
                break;
            case "MyBooksController":
                return new MyBooksController($arg1);
                break;
        }
    }

    private function getMaxMatchedRoute($result)
    {
        $maxMatches = 0;
        $matchedRoute = null;
        foreach ($result as $route => $arr) {
            if ($arr[0] > $maxMatches) {
                $maxMatches = $arr[0];
                $matchedRoute = $route;
            }
        }
        return $matchedRoute;
    }
}