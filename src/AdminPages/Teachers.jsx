import DashboardLayout from '../Components/DashboardLayout'
import './CSS/Teachers.css'
import Modal from 'react-bootstrap/Modal';
import { MdOutlineClose } from "react-icons/md";
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const Teachers = () => {
    const [modalShow, setModalShow] = useState(false)
    const [teachers, setTeacher] = useState([])

    const fetchTeacher = async () => {
        try {
            const res = await axios.get('./Data/Teachers.json')
            console.log(res);
            setTeacher(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTeacher()
    }, [])

    return (
        <>
            <DashboardLayout>
                <div className='all-classes-header'>
                    <h2>Teacher</h2>
                    <button className='all-create-class' onClick={() => setModalShow(true)}>Create class</button>
                </div>


                <Table className='teacher-table' cellPadding='0' cellSpacing='0' striped bordered>
                    <thead>
                        <tr>
                            <th>S.NO.</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map((teacher) => (
                                <tr>
                                    <td>{teacher._id}</td>
                                    <td>{teacher.Name}</td>
                                    <td>{teacher.Mobile}</td>
                                    <td>
                                        <div className="teacher-btn">
                                            <button className='teacher-edit-btn'> <FaEdit /></button>
                                            <button className='teacher-delete-btn'><MdDelete /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>



                <Modal show={modalShow} centered>
                    <Modal.Header className='modal-header'>
                        <h3>Create Teacher</h3>
                        <button onClick={() => setModalShow(false)} className="close-btn" >
                            <MdOutlineClose />
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="teacher-madal-body">
                            <input type="text" placeholder='Enter the teacher name' />
                            <input type="number" placeholder='Enter the mobile number' />
                            <button className='add-btn'>ADD</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </DashboardLayout>
        </>
    )
}

export default Teachers