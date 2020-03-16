<?php


namespace views;


interface View
{
    public function send();

    public function error($code);

    public function putData($data);

    public function getType();
}