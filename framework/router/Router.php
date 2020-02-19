<?php

namespace router;
use controllers\BooksController;
use controllers\PaymentController;
use views\ViewApplicationJson;

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
        }
    }

    private function resolvePath($requestPath, $resolvers)
    {
        $result = array();
        foreach ($resolvers as $route => $resolver) {
            if ($route == $requestPath) {
                $classAndMethod = explode("::", $resolver);
                $view = $this->getView();
                $data = $this->request->getJsonData();

                call_user_func(array($this->createClassByName($classAndMethod[0], $view, $data), $classAndMethod[1]));
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
        } else {
            $args = $result[$matchedRoute][1];

            $resolver = $resolvers[$matchedRoute];
            $classAndMethod = explode("::", $resolver);

            $view = $this->getView();
            $data = $this->request->getJsonData();

            call_user_func(array($this->createClassByName($classAndMethod[0], $view, $data), $classAndMethod[1]), ...$args);
        }
    }

    private function getView(){
        switch ($_SERVER['CONTENT_TYPE']){
            case "application/json":
            case "":
            default:
                return new ViewApplicationJson();
                break;
        }
    }

    private function createClassByName($className, $arg1, $arg2){
        switch ($className){
            case "BooksController":
                return new BooksController($arg1);
                break;
            case "PaymentController":
                return new PaymentController($arg1, $arg2);
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