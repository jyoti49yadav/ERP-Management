
import React, { useEffect, useState } from "react";
import "../AdminPages/CSS/Student.css";
import DashboardLayout from "../Components/DashboardLayout";
import Modal from "react-bootstrap/Modal";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { IoEye } from "react-icons/io5";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [modalStudent, setModalStudent] = useState(false);
    const [modalStudentData, setModalStudentData] = useState({});
    const [search, setSearch] = useState("");

    const fetchStudents = async () => {
        try {
            const res = await axios.get("/Data/Student.json");

            // JSON array ko state mein store karein
            setStudents(Array.isArray(res.data) ? res.data : []);

            console.log("Student Data:", res.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleShow = (student) => {
        setModalStudentData(student);
        setModalStudent(true);
    };

    const handleClose = () => {
        setModalStudent(false);
        setModalStudentData({});
    };

    const filteredStudents = students.filter((student) => {
        const query = search.trim().toLowerCase();

        return (
            String(student.Name ?? "").toLowerCase().includes(query) ||
            String(student.RegNo ?? "").toLowerCase().includes(query) ||
            String(student.PhoneNumber ?? "").includes(search.trim()) ||
            String(student.Email ?? "").toLowerCase().includes(query) ||
            String(student.currentClass ?? "").toLowerCase().includes(query)
        );
    });

    const formatLabel = (key) => {
        const labels = {
            _id: "Student ID",
            RegNo: "Registration Number",
            Name: "Student Name",
            PhoneNumber: "Phone Number",
            Email: "Email",
            DOB: "Date of Birth",
            Gender: "Gender",
            AdharNumber: "Aadhaar Number",
            FatherName: "Father Name",
            MotherName: "Mother Name",
            LastSchool: "Last School",
            LastClass: "Last Class",
            LastSchoolcode: "Last School Code",
            LastClassTotalMarks: "Last Class Total Marks",
            currentClass: "Current Class",
            photo: "Photo",
        };

        if (labels[key]) return labels[key];

        return key
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^_/, "")
            .replace(/^./, (char) => char.toUpperCase());
    };

    const renderValue = (key, value) => {
        if (value === null || value === undefined || value === "") {
            return "-";
        }

        if (
            key.toLowerCase() === "photo" &&
            typeof value === "string"
        ) {
            return (
                <img
                    src={value}
                    alt={modalStudentData.Name || "Student"}
                    className="student-photo"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
            );
        }

        if (typeof value === "object") {
            return JSON.stringify(value);
        }

        return String(value);
    };

    return (
        <>
            <DashboardLayout>
                {/* Page Header */}
                <div className="student-header">
                    <h2>All Students</h2>

                    <input
                        type="text"
                        className="student-search"
                        placeholder="Search student..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="student-table">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Reg. No.</th>
                                <th>Student Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Current Class</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <tr
                                        key={student._id ?? student.RegNo ?? index}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{student.RegNo ?? "-"}</td>
                                        <td>{student.Name ?? "-"}</td>
                                        <td>{student.PhoneNumber ?? "-"}</td>
                                        <td>{student.Email ?? "-"}</td>
                                        <td>{student.currentClass ?? "-"}</td>

                                        <td>
                                            <div className="student-action">
                                                <button
                                                    type="button"
                                                    className="student-view-btn"
                                                    onClick={() => handleShow(student)}
                                                    title="View Student Details"
                                                >
                                                    <IoEye />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

                <Modal
                    show={modalStudent}
                    onHide={handleClose}
                    centered
                    size="lg"
                >
                    <Modal.Header className="modal-head">
                        <h3>
                            {modalStudentData.Name || "Student Details"}
                        </h3>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="close-btn"
                            aria-label="Close"
                        >
                            <MdOutlineClose />
                        </button>
                    </Modal.Header>

                    <Modal.Body>
                        <Table bordered striped responsive>
                            <tbody>
                                {Object.entries(modalStudentData).map(
                                    ([key, value]) => (
                                        <tr key={key}>
                                            <th style={{ width: "40%" }}>
                                                {formatLabel(key)}
                                            </th>

                                            <td>{renderValue(key, value)}</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </DashboardLayout>
        </>
    );
};

export default Student;
