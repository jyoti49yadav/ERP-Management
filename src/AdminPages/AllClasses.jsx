import React, { useEffect, useState } from 'react'
import '../AdminPages/CSS/AllClasses.css'
import DashboardLayout from '../Components/DashboardLayout'
import Modal from 'react-bootstrap/Modal';
import { MdOutlineClose } from "react-icons/md";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";


const AllClasses = () => {
  const [modalShow, setModalShow] = useState(false)
  const [modalClass, setModalClass] = useState(false)
  const [teachers, setTeacher] = useState([])
  const [subjects, setSubject] = useState([])
  const [modalClassData, setModalClassData] = useState([])
  const [classes, setClasses] = useState([])

  const [rows, setRows] = useState([
    { teachers: "", subjects: "" },
  ])


  const fetchClasses = async () => {
    try {
      const res = await axios.get('./Data/Classdetails.json')
      console.log(res)
      setClasses(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get('./Data/Subjects.json');
      console.log(res)
      setSubject(res.data)
      const res1 = await axios.get('./Data/Teachers.json')
      setTeacher(res1.data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
    fetchClasses()
  }, [])

  const addMore = () => {
    setRows([...rows, { teachers: "", subjects: "" }])
  }

  const handleShow = (c) => {
    setModalClassData(c)
    setModalClass(true)
    console.log(c);

  }
  return (
    <>
      <DashboardLayout>
        <div className='all-classes-header'>
          <h2> All class</h2>
          <button className='all-create-class' onClick={() => setModalShow(true)}>Create class</button>
        </div>

        <div className="all-class-table">
          <Table striped bordered>
            <thead>
              <tr>
                <th>Sr.No </th>
                <th>Class </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {
                classes.map((c) => (
                  <tr key={c._id}>
                    <td>{c._id}</td>
                    <td>{c.Class}</td>
                    <td>
                      <div className="subject-btn">
                        <button className='subject-edit-btn'> <FaEdit /></button>
                        <button className='subject-delete-btn'><MdDelete /></button>
                        <button className='subject-edit-btn' onClick={() => handleShow(c)}><IoEye /></button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

        </div>




        <Modal show={modalShow} centered>
          <Modal.Header className="modal-head">
            <h3>Create Class</h3>

            <button
              onClick={() => setModalShow(false)}
              className="close-btn"
            >
              <MdOutlineClose />
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="class-form">

              <div className="form-group">
                <label>Class Name</label>
                <input
                  type="text"
                  placeholder="Enter class name"
                />
              </div>

              {
                rows.map((index, data) => (
                  <div className="form-row" key={index}>

                    <div className="form-group">
                      <label>Teachers</label>
                      <select>
                        <option value="">Select Teacher</option>
                        {
                          teachers.map((t) => (
                            <option value={t._id}>{t.Name}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Subject</label>

                      <select>
                        <option value="">Select Subject</option>
                        {
                          subjects.map((s) => (
                            <option value={s._id}>{s.name}</option>
                          ))
                        }
                      </select>
                    </div>

                  </div>
                ))
              }
              <button className="create-btn" onClick={addMore}>Add More</button>

              <h1>Fee</h1>
              <select className="form-group">
                <option value="">Select fee type</option>
                <option value="">Tution Fee</option>
                <option value="">Exam Fee</option>
                <option value="">Admission</option>
                <option value="">Other</option>
              </select>
              <input type="text" name='free' placeholder='Enter Fee in rupees' />
              <input type="radio" value='Monthly' />Monthly
              <input type="radio" value='Yearly' />Yearly
              <input type="radio" value='Onetime' />One-Time

              Monthly
            </div>
          </Modal.Body>

          <Modal.Footer>
          </Modal.Footer>
        </Modal>


        <Modal
          show={modalClass} centered >
          <Modal.Header className="modal-head">
            <h3>{modalClassData.Class}</h3>

            <button
              onClick={() => setModalClass(false)}
              className="close-btn"
            >
              <MdOutlineClose />
            </button>
          </Modal.Header>

          <Modal.Body>

            <Table border='1' striped bordered style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {
                  modalClassData?.Subject?.map((d) => (
                    <tr>
                      <td>{d.Subject}</td>
                      <td>{d.Teacher}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <h1>Fee</h1>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Fee</th>
                  <th>Fee Amount</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  modalClassData?.fee?.map((f)=>(
                    <tr>
                      <td>{f.FeeType}</td>
                      <td>{f.Amount}</td>
                      <td>{f.PaymentType}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </DashboardLayout>
    </>
  )
}

export default AllClasses