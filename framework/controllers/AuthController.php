<?php


namespace controllers;


use entity\User;
use repositories\UserRepository;
use router\Request;
use views\View;

class AuthController
{

    private View $view;
    private Request $request;
    private UserRepository $userRepository;

    public function __construct(View $view, Request $request)
    {
        $this->userRepository = new UserRepository();
        $this->view = $view;
        $this->request = $request;
    }

    public function register(){
        $newUser = new User(...array_values($this->request->getData()));
        $errors = array();

        if($newUser->getUsername() === ""){
            array_push($errors, "Username is empty");
        }
        if($newUser->getEmail() === ""){
            array_push($errors, "Email is empty");
        } elseif(filter_var($newUser->getEmail(), FILTER_VALIDATE_EMAIL) === false) {
            array_push($errors, "Email is invalid");

        }
        if($newUser->getPassword() === ""){
            array_push($errors, "Password is empty");
        }

        if(count($errors) === 0) {
            $user = $this->userRepository->get($newUser->getUsername());
            if ($user !== null) {
                if ($user->getUsername() === $newUser->getUsername()) {
                    array_push($errors, "This login is already taken");
                }
                if ($user->getEmail() === $newUser->getEmail()) {
                    array_push($errors, "This email is already registered");
                }
            }
        }

        if(count($errors) === 0){
            $user = $this->userRepository->save($newUser);
            $this->view->putData($user);
            $this->view->send();
        } else {
            $this->view->putData($errors);
            $this->view->error(500);
        }

    }

}