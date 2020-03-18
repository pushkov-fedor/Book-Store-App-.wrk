<?php


namespace controllers;


use phpmailer\Mailer;
use repositories\BooksRepository;
use router\Request;
use views\View;

class PaymentController
{
    private BooksRepository $booksRepository;
    private View $view;
    private Request $request;

    public function __construct($view, $request)
    {
        $this->booksRepository = new BooksRepository();
        $this->view = $view;
        $this->request = $request;
    }

    public function after()
    {
        $data = $this->request->getData();
        $this->view->putData($data);
        $this->view->send();
        $customerEmail = $data['customerEmail'];
        $customerBooks = $data['books'];
        $customerBooksUrl = "http://ec2-3-133-82-119.us-east-2.compute.amazonaws.com/my-books?email=$customerEmail";
        Mailer::send(
            $customerEmail,
            "Thank you for using our service! You books are bellow",
            "Follow the link to get your books\n$customerBooksUrl"
        );
        $this->booksRepository->save($customerEmail, $customerBooks);
    }

    public function pay()
    {
        $data = $this->request->getData();

        if($this->checkPaymentInfo($data)) {
            $this->view->putData($data);
            $this->view->send();
        }
    }

    private function checkPaymentInfo($info){
        return true;
    }
}