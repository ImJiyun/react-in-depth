import React, { useEffect, useState } from "react";
import axios from "axios";

// fetch a specific user data
export const ResourceLoader = ({ resourceUrl, resourceName, children }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(resourceUrl);
      setResource(response.data);
    };
    fetchUser();
  }, [resourceUrl]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // add props to the element
          return React.cloneElement(child, { [resourceName]: resource });
        }
        return child;
      })}
    </>
  );
};
