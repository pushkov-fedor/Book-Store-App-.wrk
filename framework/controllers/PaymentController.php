<?php


namespace controllers;


use phpmailer\Mailer;
use repositories\PaymentRepository;
use views\View;

class PaymentController
{
    private PaymentRepository $paymentRepository;
    private View $view;
    private $data;

    public function __construct($view, $data)
    {
        $this->paymentRepository = new PaymentRepository();
        $this->view = $view;
        $this->data = $data;
    }

    public function after(){
        $this->view->putData($this->data);
        $this->view->send();
        $customerEmail = $this->data['customerEmail'];
        $customerBooks = $this->data['books'];
        $customerBooksUrl = "http://192.168.33.10:3000/myBooks?email=$customerEmail";
        Mailer::send($customerEmail, "Thank you for using our service! You books are bellow",
                     "Follow the link to get your books\n$customerBooksUrl");
        $this->paymentRepository->saveCustomerPurchases($customerEmail, $customerBooks);
    }
}