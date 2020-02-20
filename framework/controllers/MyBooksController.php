<?php


namespace controllers;


use repositories\MyBooksRepository;
use views\View;

class MyBooksController
{
    private MyBooksRepository $myBooksRepository;
    private View $view;

    public function __construct($view)
    {
        $this->view = $view;
        $this->myBooksRepository = new MyBooksRepository();
    }

    public function getPurchased($email){
        $books = $this->myBooksRepository->getPurchased($email);
        $this->view->putData($books);
        $this->view->send();
    }

    public function getFile($fileId){
        $file = $this->myBooksRepository->getFile($fileId);
        if (file_exists($file)) {
            header('Access-Control-Allow-Origin: *');
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.basename($file).'"');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file));
            readfile($file);
        }
    }
}