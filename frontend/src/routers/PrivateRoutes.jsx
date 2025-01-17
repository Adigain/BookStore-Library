import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  //const {loading, currentUser} = getAuth();

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);   // Set currentUser based on the authentication state
      setLoading(false);      // Once we have the user, set loading to false
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for auth state
  }
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
