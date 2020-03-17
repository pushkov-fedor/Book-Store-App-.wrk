<?php


namespace controllers;


use phpmailer\Mailer;
use repositories\MyBooksRepository;
use views\View;

class PaymentController
{
    private MyBooksRepository $paymentRepository;
    private View $view;
    private $data;

    public function __construct($view, $data)
    {
        $this->paymentRepository = new BooksRepository();
        $this->view = $view;
        $this->data = $data;
    }

    public function after()
    {
        $this->view->putData($this->data);
        $this->view->send();
        $customerEmail = $this->data['customerEmail'];
        $customerBooks = $this->data['books'];
        $customerBooksUrl = "http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/my-books?email=$customerEmail";
        Mailer::send(
            $customerEmail,
            "Thank you for using our service! You books are bellow",
            "Follow the link to get your books\n$customerBooksUrl"
        );
        $this->paymentRepository->save($customerEmail, $customerBooks);
    }
}