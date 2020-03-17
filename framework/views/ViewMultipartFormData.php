<?php


namespace views;


class ViewMultipartFormData implements View
{
    private $data;
    private $type;

    public function __construct($type="application/json")
    {
        $this->type = $type;
    }

    public function send()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($this->data) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($this->data));
        readfile($this->data);
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

    public function error($code)
    {
        http_response_code($code);
    }
}