import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io"
import { FaSearch } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa6"
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa"
import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
]

const Navbar = () => {
    const divRef = useRef(null);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //const [searchDropdown, setSearchDropdown] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector((state) => state.cart.cartItems)

    const {currentUser, logout} = useAuth()
    const handleLogOut = () => {
        logout()
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        
    }
    useEffect(() => {
        const fetchSearchQuery = async () => {
            const response = await fetch(`http://localhost:5000/api/books/search-book/search?query=${searchQuery}`, {
                method: 'GET',
            })
            if(response.status === 404) {
                setSearchResult([]);                
            }
            if(response.status === 200){
                const searchBooks = await response.json();
                setSearchResult(searchBooks);
            }
        }
        fetchSearchQuery();
        

    }, [searchQuery])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setSearchQuery(''); 
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //const currentUser = false
    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6 bg-gray-900'>
            <nav className='flex justify-between items-center bg-gray-900'>
                {/*left*/}
                <div ref={divRef}
                
                 className='flex items-center md:gap-16 gap-4'>
                    <Link to="/" className='bg-primary p-1 flex items-center rounded-md'><IoMdHome className='size-8' /></Link>
                    {/* right */}
                    <div className='relative sm:w-72 w-40 space-x-2'>
                        <FaSearch className='absolute inline-block left-3 inset-y-2' />
                        <input 
                        onChange={(e) => handleSearch(e.target.value)}
                        type="text" placeholder="Search Here"
                            className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md outline-none focus:ring focus: ring-blue-500'
                        />
                        {searchQuery && (
                            <div className="absolute w-full mt-2 bg-white 100 shadow-lg rounded-md max-h-60 overflow-auto z-50">
                                {searchResult.length > 0 ? (
                                    searchResult.map((book) => (
                                        <Link
                                            key={book._id}
                                            to={`/books/${book._id}`}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            {book.title}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/*right*/}
                <div className='relative flex items-center md:space-x-8 space-x-2'>
                    <div>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt='user' className='size-8 hover:outline outline-blue-500 rounded-full' />
                                </button>
                                {
                                    isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                            <ul className=''>
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button 
                                                    onClick={handleLogOut}
                                                    className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>
                                                        Log Out
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : <Link to='/login'><FaRegUser className='bg-primary p-1 flex items-center rounded-full size-8' /></Link>
                        }
                    </div>

                    <Link to='/dashboard' className='hidden sm:block'>
                        <RiAdminFill className='bg-primary p-1 flex items-center rounded-full size-8'/>
                    </Link>
                    <Link to="/cart" className='bg-primary p-1 sm:px-4 px-2 flex items-center rounded-md'>
                        <FaShoppingCart className='' />
                        {
                            cartItems.length > 0 ? 
                        <span className='text-sm font-semibold sm:ml-2'>{cartItems.length}</span> :
                        <span className='text-sm font-semibold sm:ml-2'>0</span>
                        }
                    </Link>

                </div>
            </nav>
        </header>

    )
}

export default Navbar
