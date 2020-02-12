<?php


namespace views;


class ViewApplicationJson implements View
{
    private $data;

    public function __construct()
    {
    }

    public function send()
    {
        header('Access-Control-Allow-Origin: *');
        echo json_encode($this->data);
    }

    public function putData($data)
    {
        $this->data = $data;
    }
}