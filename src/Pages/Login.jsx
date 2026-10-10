import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdEmail, MdLockOutline } from "react-icons/md"
import './CSS/Login.css'

const Login = () => {
  const [user, setUser] = useState([])
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    const res = await axios.get("/Data/Users.json")
    setUser(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const sendOtp = async () => {
    let existingUser = user.find((u) => u?.email == email)

    if (email == existingUser?.email) {
      setStep(2)
      toast.success("OTP Sent Successfully")
    } else {
      toast.warn("User Not Found!")
    }
  }

  const verifyOtp = () => {
    let existingUser = user.find((u) => u?.email == email)

    console.log(existingUser.role)

    if (existingUser.otp == otp) {
      localStorage.setItem("token", existingUser.token)
      localStorage.setItem("role", existingUser.role)

      toast.success('Login Successfully')
      navigate('/dashboard')
    } else {
      toast.error("Invalid OTP")
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">
            <MdLockOutline />
          </div>

          <h1>Welcome Back</h1>
          <p>Login to continue to your account</p>
        </div>

        <div className="login-form">

          <label>Email Address</label>

          <div className="input-box">
            <MdEmail />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {
            step == 2 && (
              <>
                <label>OTP</label>

                <div className="input-box">
                  <MdLockOutline />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                  />
                </div>
              </>
            )
          }

          {
            step == 2
              ?
              <button className="login-btn" onClick={verifyOtp}>
                Verify OTP
              </button>
              :
              <button className="login-btn" onClick={sendOtp}>
                Send OTP
              </button>
          }

        </div>

        <div className="login-footer">
          <p>Secure Login • Your information is protected</p>
        </div>

      </div>

    </div>
  )
}

export default Login