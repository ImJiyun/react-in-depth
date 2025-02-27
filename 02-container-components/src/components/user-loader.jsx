import React, { useEffect, useState } from "react";
import axios from "axios";

// fetch a specific user data
export const UserLoader = ({ userId, children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // add props to the element
          return React.cloneElement(child, { user });
        }
        return child;
      })}
    </>
  );
};
