import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore/lite'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { firestore } from '../../../config/firebase'

const { Title } = Typography

export default function Todos() {

    const { user } = useAuthContext()
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProccessing, setIsProccessing] = useState(false)
    const [todo, setTodo] = useState({})

    const handleChange = (e) => {
        setTodo((s) => ({ ...s, [e.target.name]: e.target.value }))
    }

    const formatTime = (time) => {
        const date = new Date(`1970-01-01T${time}:00`);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const fetchDocument = async () => {
        let array = []
        const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            array.push(doc.data())
        });
        setDocuments(array)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDocument()
    }, [])

    const handleUpdate = async () => {
        let formData = { ...todo }
        formData.dateModified = serverTimestamp()
        formData.modifiedBy = {
            email: user.email,
            uid: user.uid
        }
        setIsLoading(true)
        try {
            await setDoc(doc(firestore, "todos", formData.id), formData, { merge: true });
            let newDocuments = documents.map((doc) => {
                if (doc.id === todo.id) return formData
                return doc
            })
            setDocuments(newDocuments)
            window.toastify("Todo has been successfully updated.", "success");
        } catch (err) {
            console.error(err)
            window.toastify("Something went wrong while updating this todo.", "error");
        }
        setIsLoading(false)
    }

    const handleDelete = async (todo) => {
        setIsProccessing(true)
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            const newDocuments = documents.filter((doc) => doc.id !== todo.id)
            setDocuments(newDocuments)
            window.toastify("Todo has been successfully deleted.", "success")
        } catch (err) {
            console.error(err)
            window.toastify("Something went wrong.", "error")
        }
        setIsProccessing(false)
    }

    return (
        <>
            <Title level={1} className="text-center text-white py-3">
                My Todos
            </Title>

            <main className="showTodos">
                <div className="card p-3 p-md-3 p-lg-4" style={{ borderRadius: '20px' }}>
                    {!isLoading ? (
                        <table className="table table-light table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((todo, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>{todo.title}</td>
                                        <td>{todo.location}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.date}</td>
                                        <td>{formatTime(todo.time)}</td>
                                        <td>{todo.status}</td>
                                        <td>
                                            <Button
                                                type="primary"
                                                size="medium"
                                                className="me-1 my-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#editModal"
                                                onClick={() => setTodo(todo)}
                                                loading={isLoading}
                                                style={{ fontWeight: 'bolder' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="medium"
                                                danger
                                                className="btn-sm"
                                                onClick={() => handleDelete(todo)}
                                                loading={isProccessing}
                                                style={{ fontWeight: 'bolder' }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <div className="spinner-grow"></div>
                        </div>
                    )}
                </div>
            </main>

            <div className="modal fade" id="editModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ borderRadius: '20px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title text-center fs-5">Update Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <Form layout="vertical">
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12}>
                                        <Input
                                            style={{ borderRadius: '20px', width: '100%', fontSize: '14px' }}
                                            size="large"
                                            type="text"
                                            placeholder="Enter Title"
                                            name="title"
                                            value={todo.title || ""}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Input
                                            style={{ borderRadius: '20px', width: '100%', fontSize: '14px' }}
                                            size="large"
                                            type="text"
                                            placeholder="Enter Location"
                                            name="location"
                                            value={todo.location || ""}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <textarea
                                            style={{ borderRadius: '20px', width: '100%', fontSize: '14px' }}
                                            className="form-control"
                                            rows={4}
                                            placeholder="Enter Description"
                                            name="description"
                                            value={todo.description || ""}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <Input
                                            style={{ borderRadius: '20px', width: '100%', fontSize: '14px' }}
                                            size="large"
                                            type="date"
                                            name="date"
                                            value={todo.date || ""}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} sm={8}>
                                        <Input
                                            style={{ borderRadius: '20px', width: '100%', fontSize: '14px' }}
                                            size="large"
                                            type="time"
                                            name="time"
                                            value={todo.time || ""}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={24}>
                                        <select
                                            name="status"
                                            className="form-control text-center"
                                            value={todo.status || ""}
                                            onChange={handleChange}
                                            style={{ borderRadius: '20px', width: '100%' }}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                style={{ fontWeight: 'bolder' }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={handleUpdate}
                                style={{ fontWeight: 'bolder' }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .showTodos .card {
                    max-width: 1100px;
                    margin: 0 auto;
                    margin-bottom: 30px;
                    padding: 10px 15px;
                }

                @media (max-width: 768px) {
                    .showTodos .card {
                        max-width: 70%;
                        padding: 10px 15px;
                    }

                    .modal-body input, .modal-body textarea {
                        font-size: 14px;
                        padding: 8px;
                    }

                    .modal-footer button {
                        font-size: 14px;
                    }
                }
            `}</style>
        </>
    )
}
