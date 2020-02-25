import React from 'react'
import { inject, observer } from 'mobx-react'
import "./Authentication.css"

const Authentication = inject("rootStore")(observer((props) => {

  const toggleShowAuthPopup = props.rootStore.authStore.toggleShowAuthPopup;

  return (
    <div id="auth-bg" className="position-fixed d-flex flex-column justify-content-center align-items-center auth-bg"
         onClick={(event) => toggleShowAuthPopup(event)}>
      <div className="bg-white p-5 auth-container">
        <form>
            <h1 className="h3 mb-3 font-weight-light">Please sign in</h1>
            <input type="email" id="inputEmail" className="form-control mb-1" placeholder="Email address"/>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password"/>
            <div className="checkbox my-2">
              <label className="m-0">
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
        <hr/>
        <form>
          <h1 className="h3 mb-3 font-weight-light">New user?</h1>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
        </form>
      </div>
    </div>
  )
}));

export default Authentication