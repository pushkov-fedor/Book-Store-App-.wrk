<?php


namespace views;


class ViewApplicationJson implements View
{
    private $data;
    private $type;

    public function __construct($type)
    {
        $this->type = $type;
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

    public function getType()
    {
        return $this->type;
    }

    public function error($code)
    {
        http_response_code($code);
    }
}