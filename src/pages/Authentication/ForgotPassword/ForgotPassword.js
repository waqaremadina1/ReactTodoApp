import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";


const { Title } = Typography;



const initialState =  {
    email: ""
}


export default function ForgotPassword() {


    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e) =>
        setState((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        let { email } = state;

        if (email < 5) {
            return window.toastify("Invalid email Address", "error");
        }


        console.log(email);

        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                return window.toastify("Password reset email sent!", "success");
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                console.error(error)
                return window.toastify("Something went wrong while sending email..", "error");
                // ..


            })
            .finally(() => {
                setIsLoading(false)
                setState(initialState)

            })


    };

    return (
        <>
            <main className="auth">
                <div className="card p-3 p-md-4" style={{borderRadius: '20px'}}>
                    <Title level={2} className="text-center">
                        Reset Password
                    </Title>
                    <Form layout="vertical">
                        {/* <Space> */}
                        <Row gutter={[16, 16]}>


                            <Col span={[24]}>
                                <Input
                                style={{borderRadius: '20px'}}
                                    size="large"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                            </Col>


                            <Button
                            style={{borderRadius: '20px', fontWeight: 'bolder'}}
                                type="primary"
                                size="large"
                                loading={isLoading}
                                onClick={handleSubmit}
                                className="w-100 my-2  "
                            >
                                Send verification email
                            </Button>
                        </Row>
                        <Row>
                            <Col>
                                <p className="ms-5 "  >Login With Password ? <Link to="/authentication/login" style={{ textDecoration: "none", fontWeight: "bold" }} >Click to Login</Link></p>
                            </Col>
                        </Row>
                        {/* </Space> */}
                    </Form>
                </div>
            </main>
        </>
    );
}
