import React, { useEffect, useState } from "react";
import axios from "axios";

// It doesn't know where the data is coming from
export const DataSource = ({ getData = () => {}, resourceName, children }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getData();
      setResource(response.data);
    };
    fetchUser();
  }, [getData]);

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
