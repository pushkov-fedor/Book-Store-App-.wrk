<?php


namespace views;


class ViewMultipartFormData implements View
{
    private $data;
    private string $type;
    private string $origin;

    public function __construct($origin, $type="multipart/form-data")
    {
        $this->type = $type;
        $this->origin = $origin;
    }

    public function send()
    {
        header("Access-Control-Allow-Origin: $this->origin");
        header("Access-Control-Allow-Credentials: true");
//        header("Access-Control-Allow-Headers: Accept, Content-Type");
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