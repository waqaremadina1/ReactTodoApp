// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore/lite";
// import { auth, firestore } from "../../../config/firebase";
// import { useAuthContext } from "../../../context/AuthContext";

const initialState = { fullName: "", email: "", password: "" };

export default function Register() {
  const { dispatch } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let { email, password } = state;

    setIsProcessing(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        addDocument(user);
        console.log(user);
        window.toastify("User registered successfully", "success");
      })
      .catch((err) => {
        console.error(err);
        window.toastify("Something went wrong", "danger");
        setIsProcessing(false);
      });
  };

  const addDocument = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        uid: user.uid,
      });
      console.log("User document created in Firestore");
      dispatch({ type: "LOGIN" });
    } catch (err) {
      console.log(err);
      window.toastify("Error", "danger");
    }
    setIsProcessing(false);
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div
              className="card p-2 p-md-3 py-lg-4"
              style={{ borderRadius: "20px" }}
            >
              <div className="row">
                <div className="col">
                  <h3 className="mb-1 text-center">Register</h3>
                </div>
              </div>
              <form onSubmit={handleRegister}>
                <div className="row mb-1">
                  <div className="col">
                    <label htmlFor="text"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      name="name"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name="email"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                </div>
                <div className="row mb-4 position-relative">
                  <div className="col">
                    <label htmlFor="password"></label>
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type
                      className="form-control"
                      placeholder="Enter Your Password"
                      name="password"
                      onChange={handleChange}
                      required=""
                      style={{ borderRadius: "20px" }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                      style={{
                        position: "absolute",
                        right: "16px",
                        top: "68%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"} {/* Eye Icon */}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button
                      className="btn btn-danger w-100"
                      disabled={isProcessing}
                      style={{ borderRadius: "20px", fontWeight: "bolder" }}
                    >
                      {!isProcessing ? (
                        "Register"
                      ) : (
                        <div className="spinner-grow spinner-grow-sm"></div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <div className="row mt-3">
                <div className="col">
                  <p className="mb-0 text-center text-dark fw-bold">
                    Already have an account?{" "}
                    <Link
                      to="/authentication/login"
                      className="text-primary text-decoration-none fw-bold"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Link to="/" className="text-primary text-decoration-none fw-bold">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
