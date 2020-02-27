<?php


namespace views;


class ViewMultipartFormData implements View
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
        http_response_code(200);
    }

    public function putData($data)
    {
        $this->data = $data;
    }


    public function getType()
    {
        return $this->type;
    }
}