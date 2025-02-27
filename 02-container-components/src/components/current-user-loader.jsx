import React, { useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserLoader = ({ children }) => {
  // container component for loading data
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/current-user");
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
