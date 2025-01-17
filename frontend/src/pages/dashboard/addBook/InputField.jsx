import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../../../redux/features/cart/booksApi";
import Swal from 'sweetalert2';

const InputField = () => {
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [addBook, {isLoading, error}] = useAddBookMutation()
    const categories = [
        "Fiction",
        "Horror",
        "Adventure",
        "Business",
      ];
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
      } = useForm();
    const onSubmit = async (data) => {
        
        const newBook = {
            ...data,
            coverImage: imageFileName,
        }
        try{
            await addBook(newBook).unwrap()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your book has been added",
              showConfirmButton: false,
              timer: 1500
            });
            reset();
            setImageFile(null);
            setImageFileName('')
          }
          catch (err) {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error! Book not added",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }

    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        setImageFileName(file.name)
        }        
    }
  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
          {...register("title", { required: true })}
            type="text"
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Input Title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <input
          {...register("description", { required: true })}
            type="text"
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select 
          {...register("category", { required: true })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            {categories.map((category, index) => (
                <option key={index}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Trending
          </label>
          <select 
          {...register("trending", { required: true })}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            
                <option key='true'>True</option>
                <option key='false'>False</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          <p className="text-sm text-gray-500">Selected: image.png</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Old Price
          </label>
          <input
          {...register("oldPrice", { required: true })}
            type="number"
            step="0.01"
            min="0"
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="0.00"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            New Price
          </label>
          <input
          {...register("newPrice", { required: true })}
            type="number"
            step="0.01"
            min="0"
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="0.00"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default InputField;
