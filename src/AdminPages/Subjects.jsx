import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import './CSS/Subjects.css'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Subjects = () => {
  const [modalShow, setModalShow] = useState(false)
  const [subjects, setSubject] = useState([])
  const fetchSubject = async () => {
    try {
      const res = await axios.get('/Data/Subjects.json');
      console.log(res)
      setSubject(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchSubject()
  }, [])

  return (
    <>
      <DashboardLayout>
        <div className='all-classes-header'>
          <h2> All Subjects</h2>
          <button className='all-create-class' onClick={() => setModalShow(true)}>ADD Subject</button>
        </div>

        {/*  Table Data  */}

        <Table className='subject-table' cellPadding={0} cellSpacing={5} striped border>
          <thead className='border-1'>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              subjects.map((subject) => (
                <tr>
                  <td>{subject._id}</td>
                  <td>{subject.name}</td>
                  <td>
                    <div className="subject-btn">
                      <button className='subject-edit-btn'> <FaEdit /></button>
                    <button className='subject-edit-btn'><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>



        <Modal show={modalShow} centered>
          <Modal.Header className='modal-header'>
            <h2>Add Subject</h2>
            <button onClick={() => setModalShow(false)} className="close-btn" >
              <MdOutlineClose />
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="subject-body">
              <input type="text" placeholder='Enter the Subject' />
              <button>ADD</button>
            </div>
          </Modal.Body>
        </Modal>
      </DashboardLayout>
    </>
  )
}

export default Subjects