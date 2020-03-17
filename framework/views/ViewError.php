<?php


namespace views;


class ViewError implements View
{
    public function send()
    {
        $this->error(500);
    }

    public function error($code)
    {
        http_response_code($code);
    }

    public function putData($data)
    {
        // TODO: Implement putData() method.
    }

    public function getType()
    {
        // TODO: Implement getType() method.
    }
}