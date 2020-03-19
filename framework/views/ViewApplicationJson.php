<?php


namespace views;


class ViewApplicationJson implements View
{
    private $data;
    private $type;
    private $origin;

    public function __construct($origin, $type="application/json")
    {
        $this->type = $type;
        $this->origin = $origin;
    }

    public function send()
    {
        header("Access-Control-Allow-Origin: $this->origin");
        header("Access-Control-Allow-Credentials: true");
//        header("Access-Control-Allow-Headers: Accept, Content-Type");
        echo $this->data;
    }

    public function putData($data)
    {
        $this->data = json_encode($data);
    }

    public function getType()
    {
        return $this->type;
    }

    public function error($code)
    {
        http_response_code($code);
        echo $this->data;
    }
}