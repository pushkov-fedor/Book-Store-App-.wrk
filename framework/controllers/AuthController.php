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

    public function auth(){
        $username = $this->request->getData()["username"];
        $password = $this->request->getData()["password"];
        $user = new User($username, $password);
        $errors = array();

        $user->validate($errors);
        if(count($errors) === 0){
            $userFromDB = $this->userRepository->get($user);
            if ($user === null){
                array_push($errors, "No user with this username");
            } elseif (md5($user->getPassword()) !== $userFromDB->getPassword()) {
                array_push($errors, "Wrong password");
            }
        }

        if(count($errors) === 0){
            $_SESSION["isAuthorized"] = true;
            $this->view->send();
        } else {
            $this->view->putData($errors);
            $this->view->error(500);
        }
    }

    public function register(){
        $username = $this->request->getData()["username"];
        $password = $this->request->getData()["password"];
        $newUser = new User($username, $password);
        $errors = array();

        $newUser->validate($errors);

        if(count($errors) === 0) {
            $user = $this->userRepository->get($newUser);
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