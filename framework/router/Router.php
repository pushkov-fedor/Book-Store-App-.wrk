<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/router/Request.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/framework/controllers/BooksController.php';

class Router
{
    private $get_resolvers;
    private $post_resolvers;

    function __construct()
    {
        $this->get_resolvers = array();
        $this->post_resolvers = array();
    }

    function get($path, $resolver){
        $this->get_resolvers[$path]=$resolver;
    }

    function post($path, $resolver){
        $this->post_resolvers[$path]=$resolver;
    }

    public function resolve(Request $request){
        $method = $request->getMethod();
        $path = $request->getPath();

        switch ($method){
            case "GET":
                $this->resolvePath($path, $this->get_resolvers);
                break;
            case "POST":
                $this->resolvePath($path, $this->post_resolvers);
        }

    }

    private function resolvePath($requestPath, $resolvers){
        $result = array();
        foreach($resolvers as $route => $resolver){
            if($route == $requestPath) {
                $classAndMethod = explode("::", $resolver);
                call_user_func(array(new $classAndMethod[0](), $classAndMethod[1]));
                return;
            }

            $matches = 0; $args = array();
            $trimmedRoute = trim($route, "/");
            $trimmedRequest = trim($requestPath, "/");
            $explodedRoute = explode("/", $trimmedRoute);
            $explodedRequest = explode("/", $trimmedRequest);

            for($i = 0; $i < count($explodedRequest); $i++){
                if(count($explodedRoute) != count($explodedRequest)){
                    $result[$route] = array($matches, $args);
                    break;
                }

                if($explodedRoute[$i]==$explodedRequest[$i]){
                    $matches++; continue;
                }

                $trimmed = trim($explodedRoute[$i], "{");
                $trimmed = trim($trimmed, "}");

                if(strlen($trimmed) == strlen($explodedRoute[$i]) - 2){
                    $param = $explodedRequest[$i];
                    $matches++; $args[count($args)] = $param;
                } else break;
            }
            $result[$route] = array($matches, $args);
        }
        $matchedRoute = $this->getMaxMatchedRoute($result);
        if($matchedRoute==null){
            header("HTTP/1.0 404 Not Found");
        } else {
            $args = $result[$matchedRoute][1];
            $resolver = $resolvers[$matchedRoute];
            $classAndMethod = explode("::", $resolver);
            call_user_func(array(new $classAndMethod[0](), $classAndMethod[1]), ...$args);
        }
    }

    private function getMaxMatchedRoute($result){
        $maxMatches = 0;
        $matchedRoute = null;
        foreach ($result as $route => $arr){
            if($arr[0] > $maxMatches){
                $maxMatches = $arr[0];
                $matchedRoute = $route;
            }
        }
        return $matchedRoute;
    }
}