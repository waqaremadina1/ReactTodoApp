import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export default function Navbar() {
    const { isAuthenticated, dispatch, user } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();

        signOut(auth)
            .then(() => {
                dispatch({ type: 'LOGOUT' });
                navigate('/authentication/login');
            })
            .catch((error) => {
                window.toastify('Something went wrong while logging out', 'error');
            });
    };

    const handleMobileNavigation = (path) => {
        if (window.innerWidth <= 768) {
            // Mobile devices ke liye navigate aur offcanvas close karna
            document.querySelector('.offcanvas').classList.remove('show');
            document.querySelector('.offcanvas-backdrop')?.remove();
            document.body.classList.remove('offcanvas-backdrop');
        }
        navigate(path);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Home
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="offcanvas offcanvas-start bg-dark"
                        tabIndex={-1}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">
                                Home
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    {isAuthenticated ? (
                                        <button
                                            className="btn btn-link nav-link"
                                            onClick={() => handleMobileNavigation('/add')}
                                        >
                                            Add Todos
                                        </button>
                                    ) : (
                                        navigate('/')
                                    )}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated ? (
                                        <button
                                            className="btn btn-link nav-link"
                                            onClick={() => handleMobileNavigation('/todos')}
                                        >
                                            My Todos
                                        </button>
                                    ) : (
                                        navigate('/')
                                    )}
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated ? (
                                        <button
                                            className="btn btn-link nav-link"
                                            onClick={() => handleMobileNavigation('/upload')}
                                        >
                                            Upload
                                        </button>
                                    ) : (
                                        navigate('/')
                                    )}
                                </li>
                            </ul>
                            <div className="d-flex flex-row align-items-center">
                                {!isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/authentication/login"
                                            className="btn btn-success text-white me-2 button-size"
                                            style={{ fontWeight: 'bolder' }}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/authentication/register"
                                            className="btn btn-danger text-white button-size"
                                            style={{ fontWeight: 'bolder' }}
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="text-white me-3">{user.email}</h5>
                                        <Link
                                            to="/dashboard"
                                            className="btn btn-success fs-6 me-2 text-white"
                                            style={{ fontWeight: 'bolder' }}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm text-white"
                                            style={{ fontWeight: 'bolder', padding: '8px 28px' }}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <style jsx>{`
                .button-size {
                    width: 120px; /* Buttons ka size fix kar diya */
                }

                @media (max-width: 768px) {
                    .offcanvas-body ul.navbar-nav {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .offcanvas-body .d-flex {
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                    }

                    .offcanvas-body a,
                    .offcanvas-body button {
                        width: 100%;
                        text-align: center;
                        margin-bottom: 8px;
                    }
                }
            `}</style>
        </>
    );
}
