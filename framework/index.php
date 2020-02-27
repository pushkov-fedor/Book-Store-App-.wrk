<?php
spl_autoload_register(function($class){
    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require_once $file . '.php';
});

use router\Router;

$router = new Router();
include_once "config/routerConfig.php";

$router->resolve();
