import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useAuthContext } from '../../../context/AuthContext'
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite'
import { firestore } from '../../../config/firebase'

const { Title } = Typography

const initialState = {
    title: "",
    location: "",
    description: "",
    date: "",
    time: ""
}

export default function Add() {

    const { user } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setState((s) => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let { title, location, description, date, time } = state
        title = title.trim()
        location = location.trim()
        description = description.trim()
        date = date.trim()
        time = time.trim()

        if (title.length < 3) {
            return window.toastify("Title must be at least 3 characters.", "error");
        }
        if (location.length < 5) {
            return window.toastify("Please enter your location correctly.", "error");
        }
        if (description.length < 10) {
            return window.toastify("Enter a description correctly.", "error");
        }
        if (!date) {
            return window.toastify("Please enter a valid date.", "error");
        }
        if (!time) {
            return window.toastify("Please enter a valid time.", "error");
        }

        let formData = { title, location, description, date, time }

        formData.dateCreated = serverTimestamp()
        formData.id = window.getRandomId()
        formData.status = "active"
        formData.createdBy = {
            email: user.email,
            uid: user.uid
        }
        creatDocument(formData)
    }

    const creatDocument = async (formData) => {
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData);
            window.toastify("Todo has been successfully added.", "success");
            // Clear all input fields after successful addition
            setState(initialState);
        } catch (err) {
            console.log(err)
            window.toastify("Something went wrong while adding the todo.", "error");
        }
        setIsLoading(false)
    }

    return (
        <main className="addTodo">
            <div className="card p-3 p-md-4 mx-sm-4" style={{ borderRadius: '20px' }}>
                <Title level={2} className="text-center">
                    Add Todo
                </Title>
                <Form layout="vertical">
                    <Row gutter={[16, 16]}>
                        {/* Input Fields Stacked Vertically */}
                        <Col xs={24}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="text"
                                placeholder="Enter Title"
                                name="title"
                                value={state.title} // Controlled input
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={24}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="text"
                                placeholder="Enter Location"
                                name="location"
                                value={state.location} // Controlled input
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={24}>
                            <textarea
                                style={{ borderRadius: '20px' }}
                                className="form-control"
                                rows={1}
                                placeholder="Enter Description"
                                name="description"
                                value={state.description} // Controlled input
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={24}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="date"
                                placeholder="Enter Date"
                                name="date"
                                value={state.date} // Controlled input
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={24}>
                            <Input
                                style={{ borderRadius: '20px' }}
                                size="large"
                                type="time"
                                placeholder="Enter Time"
                                name="time"
                                value={state.time} // Controlled input
                                onChange={handleChange}
                            />
                        </Col>

                        <Col xs={24}>
                            <Button
                                style={{ borderRadius: '20px', fontWeight: 'bolder' }}
                                type="primary"
                                size="large"
                                loading={isLoading}
                                onClick={handleSubmit}
                                className="w-100 my-2"
                            >
                                Add Todo
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <style jsx>{`
                .addTodo .card {
                    max-width: 650px;  /* Adjusted max-width for laptops/tablets */
                    margin: 0 auto;
                }

                @media (max-width: 768px) {
                    .addTodo .card {
                        padding: 15px;  /* Reduce padding on smaller screens */
                        max-width: 90%; /* Limit the max width on smaller screens */
                    }
                }

                @media (max-width: 480px) {
                    .addTodo .card {
                        max-width: 80%; /* Full width on very small screens */
                        padding: 10px;
                    }
                }
            `}</style>
        </main>
    )
}
