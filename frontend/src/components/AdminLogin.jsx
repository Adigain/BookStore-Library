import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const onSubmit = async(data) => {
        try{
          const username=data.username;
          const password=data.password;
          const response = await fetch('http://localhost:5000/api/auth/admin', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            })
          });
          if (response.ok) {
            const datares = await response.json();
            const token = datares.token;
            window.localStorage.setItem('token', token);
            /*setTimeout(() => {
              window.localStorage.removeItem('token');
              alert("Token expired, please admin login again");
              navigate('/admin');
            }, 3600 * 1000)*/
            Swal.fire({
              title: "Admin authentication successful!",
              icon: "success",
              draggable: true
            });
            navigate('/dashboard');
          }          
          else {
            const err = await response.json()
            setMessage(`${err.message}`)
          console.error(err.message)
          }
        }
        catch (err) {
          //setMessage("Please enter valid email and password")
          setMessage(`${err}`)
          console.error(err)
        }    
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
            {...register("username", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
            {...register("password", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

        
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
             >
            
            Login
          </button>
        </div>
        </form>
        <p className="mt-5 text-center text-gray-500 text-xs">
          &copy;2025 Book Store. All rights reserved. ADMIN.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
