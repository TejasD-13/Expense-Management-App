import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [loginUser, setLoginUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Fetched user:", user);
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">Expense Management</a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <p className="nav-item mb-0 mt-1">{loginUser && loginUser.name}</p>
            </li>
            <li className="nav-item ms-3">
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
