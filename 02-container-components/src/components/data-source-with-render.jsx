import React, { useEffect, useState } from "react";
import axios from "axios";

// It doesn't know where the data is coming from
export const DataSourceWithRender = ({ getData = () => {}, render }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getData();
      setResource(response.data);
    };
    fetchUser();
  }, [getData]);

  return render(resource);
};
