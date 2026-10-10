import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import '../AdminPages/CSS/Registration.css'
import axios from 'axios'
const Registration = () => {

    const [classDetails, setClassDeatils] = useState([])
    const [selectedClass, setSelectedClass] = useState("")

    let selectedFee = classDetails.find((t) => {
        return t.Class === selectedClass
    })

    const totalFee = selectedFee?.fee?.reduce((acc, f) => acc + f.Amount, 0)

    const fetchClassDetails = async () => {
        try {
            const res = await axios.get("./Data/Classdetails.json")
            setClassDeatils(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    // const generateRegistration=()=>{
    //     console.log("RNS-" +Math.floor());
        
    // }

    useEffect(() => {
        fetchClassDetails()
    }, [])
    return (
        <>
            <DashboardLayout>
                <div><h2>Add Students</h2></div>

                <div className="registration-info">
                    <div className='heading'>
                        <h4>Date</h4>
                        <span>{new Date().toISOString().split('T')[0]}</span><br />
                    </div>
                    <div className='heading'>
                        <h4>Registration Number</h4>
                        <span> Auto</span>
                    </div>
                    <div className='heading'>
                        <h4>Session</h4>
                        <span>2026-2027</span>
                    </div>
                </div>
                <div className="registration-container">

                    <div className="form-row-one">
                        <div className="form-group">
                            <label className='form-label'>Student Name</label>
                            <input type="text" name='name' placeholder='Student Name' />
                        </div>
                        <div className="form-group">
                            <label>Profile</label>
                            <input type="file" name='photo' />
                        </div>
                        <div className="form-group">

                            <label>Phone Number</label>
                            <input type="text" name='phonenumber' placeholder='Student Phone Number' />
                        </div>


                    </div>
                    <div className="form-row-one">

                        <div className="form-group">
                            <label>DOB</label>
                            <input type="date" name='date' />

                        </div>

                        <div className="form-group">

                            <label>Gender</label>

                            <div className="gender-box">
                                <input type="radio" value="Male" name="gender" /> Male
                                <input type="radio" value="Female" name="gender" /> Female
                                <input type="radio" value="Other" name="gender" /> Other
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Category</label>

                            <select name='category'>
                                <option value="general">General</option>
                                <option value="EWS">EWS</option>
                                <option value="OBC">OBC</option>
                                <option value="ST">ST</option>
                                <option value="SC">SC</option>
                            </select>
                        </div>
                    </div>


                    <div className="form-row-one">

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name='email' placeholder='Student Email' />

                        </div>
                        <div className="form-group">
                            <label>Father's Name</label>
                            <input type="text" name='fname' placeholder="Student Father's Name" />

                        </div>
                        <div className="form-group">
                            <label>Mother's Name</label>
                            <input type="text" name='mname' placeholder="Student Mother's Name" />

                        </div>



                    </div>

                    <div className="form-row-one">
                        <label>Addrss</label>
                        <input type="text" name='address' placeholder=' Enter your Address' />
                        <label>Zip Code</label>
                        <input type="text" name='zip cade' placeholder='Zip Code' />

                    </div>

                    <h2>Last School Information</h2>
                    <div className="form-group">
                        <label>Last School Name</label>
                        <input type="text" name='lastSchoolName' placeholder='Last School Code' />
                    </div>
                    <div className="form-group">
                        <label>Last School Clas</label>
                        <input type="text" name='lastSchoolClass' placeholder='Last School Code' />
                    </div>
                    <div className="form-group">
                        <label>Last Class Total Gained Number</label>
                        <input type="text" name='lastClassTotalGainedNumber' placeholder='Last Class Total Gained Number' />
                    </div>





                    <h2>Other Information</h2>
                    <label >Class</label>
                    <select className='class' onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
                        <option value=""> Select</option>
                        {
                            classDetails.map((c) => (
                                <option key={c._id} value={c.Class}>{c.Class}</option>
                            ))
                        }
                    </select>

                    <h2>Fee Information</h2>
                    {
                        selectedFee?.fee.map((f) => (
                            <div key={f._id}>
                                <label > {f.FeeType}</label>
                                <span> {f.Amount}</span>
                                <span> {f.PaymentType}</span>
                            </div>
                        ))
                    }
                    <h3>{totalFee || 0}</h3>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Registration 