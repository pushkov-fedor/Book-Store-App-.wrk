<?php

spl_autoload_register(
    function ($class) {
        $file = str_replace('\\', DIRECTORY_SEPARATOR, $class);
        require_once $file . '.php';
    }
);

use router\Router;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$router = new Router();
include_once "config/routerConfig.php";

$router->resolve();
