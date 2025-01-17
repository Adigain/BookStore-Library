import React, { useEffect, useState } from 'react'
import { replace, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/cart/booksApi';
import { useForm } from 'react-hook-form';
import { getImgUrl } from '../../../utils/getImgUrl';



const UpdateBook = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const {data = {singleBook : []}, isLoading, isError} = useFetchBookByIdQuery(id)
    if(isLoading) (
        <div>Loading ... </div>
    )
    if(isError) (
        <div>Error </div>
    )
    const book = data.singleBook;
    const [updateBook] = useUpdateBookMutation()

    const categories = [
        "Fiction",
        "Horror",
        "Adventure",
        "Business",
      ];
    const { register, handleSubmit, setValue, } = useForm();

    useEffect(() => {
        if (book) {
            setValue('title', book.title);
            setValue('description', book.description);
            setValue('category', book?.category);
            setValue('trending', book.trending);
            setValue('oldPrice', book.oldPrice);
            setValue('newPrice', book.newPrice);
            setValue('coverImage', book.coverImage);
            setImageFileName(book.coverImage);
          }
    }, [book, setValue]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        setImageFileName(file.name)
        }        
    }
    const onSubmit = async (data) => {
        
        const updateBookData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: imageFileName,
          };
        try{
            //await updateBook({id, updateBookData}).unwrap()
            const response = await fetch(`http://localhost:5000/api/books/edit/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                  },
                  body: JSON.stringify(updateBookData),
                  credentials: "include",
            })
            if(response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your book has been updated",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    window.location.reload(); 
                  });       
                  setImageFile(null);
                  setImageFileName('')

                  navigate('/dashboard');
            }
            else {
                const err = await response.json()
          console.error(err.message)
          
            }
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

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

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
          <p className="text-sm text-gray-500">Selected: {imageFileName ? imageFileName : "image.png"}</p>
          {imageFileName && (
  <img 
  src={`${getImgUrl("books", imageFileName)}`}
    alt="Current Cover" 
    className="mb-4 w-32 h-32 object-cover" 
  />
)}
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
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook
