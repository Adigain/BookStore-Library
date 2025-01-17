import {createBrowserRouter} from "react-router-dom"
import App from "../App.jsx"
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/books/cartPage.jsx"
import CheckoutPage from "../pages/books/checkoutPage.jsx"
import SingleBook from "../pages/books/SingleBook.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import OrderPage from "../pages/books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBooks from "../pages/dashboard/ManageBooks.jsx/ManageBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/orders",
                element: <PrivateRoutes><OrderPage/></PrivateRoutes>,
            },
            {
                path: "/about",
                element: <h1>About</h1>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/cart",
                element: <CartPage/>,
            },
            {
                path: "/checkout",
                element: <PrivateRoutes><CheckoutPage/></PrivateRoutes>,
            },
            {
                path: "/books/:id",
                element: <SingleBook/>,
            },
            {
                path: "/dashboard",
                element: <AdminRoute/>,
                children: [
                    {
                        path: '',
                        element: <DashboardLayout/>,
                        children: [
                            {
                                path: "",
                                index: true,
                                element: <Dashboard/>
                            },
                            {
                                path: "add-new-book",
                                element: <AddBook/>,
                            },
                            {
                                path: "edit-book/:id",
                                element: <UpdateBook/>,
                            },
                            {
                                path: "delete-book",
                                element: <div>delete book</div>
                            },
                            {
                                path: "manage-book",
                                element: <ManageBooks/>,
                            },

                        ]
                    },
                    {
                        path: "add-new-book",
                        element: <div>add new book</div>
                    },
                    {
                        path: "edit-book/:id",
                        element: <div>edit book</div>
                    },
                    {
                        path: "delete-book",
                        element: <div>delete book</div>
                    },

                ]
            },
            {
                path: "/admin",
                element: <AdminLogin/>,

            },
            

        ]

    },
]);

export default router;

