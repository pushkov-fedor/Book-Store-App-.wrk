<?php


namespace views;


interface View
{
    public function send();
    public function putData($data);
}