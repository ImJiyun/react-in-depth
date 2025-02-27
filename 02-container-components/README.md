## Container Components

### Definition

- is responsible for handling data loading and passing them to child components
- sovles a challenge when multiple child components share the same data loading logic
- NOTE : Components are unaware of the source or management of their data

#### Loader componnent for user data

##### Presentational Component (`UserInfo` Component)

- It displays user information by receving a `user` object and rendering details

```jsx
export const UserInfo = ({ user }) => {
  const { name, age, country, books } = user || {};
  return user ? (
    <>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};
```

##### Container Component (`UserLoader` Component)

- It fetches user data from backend and passes it to the child components

```jsx
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
```

##### App Component

```jsx
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";

function App() {
  return (
    <>
      <UserLoader userId={"1"}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={"2"}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>
    </>
  );
}

export default App;
```

#### Loader component for resource data

- A more general version of `UserLoader`, `ResourceLoader` can fetch any type of resource

```jsx
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
```

##### App Component

```jsx
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";

function App() {
  return (
    <>
      <ResourceLoader resourceUrl={"/users/2"} resourceName={"user"}>
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl={"/books/1"} resourceName={"book"}>
        <BookInfo />
      </ResourceLoader>
    </>
  );
}

export default App;
```

### DataSource Component

- It decouples data fetching logic from its implementation
- It doesn't know where the data is coming from

```jsx
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
```

##### App Component

```jsx
// import { CurrentUserLoader } from "./components/current-user-loader";
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";
import { DataSource } from "./components/data-source";
import axios from "axios";

const getDataFromServer = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

function App() {
  return (
    <>
      <DataSource
        getData={() => getDataFromServer("/users/2")}
        resourceName={"user"}>
        <UserInfo />
      </DataSource>
    </>
  );
}

export default App;
```

### Render props pattern

- Instead of passing the children directly, Render props pattern passes them as a function

```jsx
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";
import { DataSource } from "./components/data-source";
import axios from "axios";
import { DataSourceWithRender } from "./components/data-source-with-render";

const getDataFromServer = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

function App() {
  return (
    <>
      <DataSourceWithRender
        getData={() => getDataFromServer("/users/2")}
        resourceName={"user"}
        render={(resource) => (
          <UserInfo user={resource} />
        )}></DataSourceWithRender>
    </>
  );
}

export default App;
```

```jsx
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
```

### Local Storage Data Loader Component

- Instead of fetching from an API, `DataSource` can be used to load data from local storage

```jsx
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { UserInfo } from "./components/user-info";
import { BookInfo } from "./components/book-info";
import { DataSource } from "./components/data-source";
import axios from "axios";
import { DataSourceWithRender } from "./components/data-source-with-render";

const getDataFromServer = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const getDataFromLocalStorage = (key) => () => {
  return localStorage.getItem(key);
};

const Message = ({ msg }) => <h1>{msg}</h1>;

function App() {
  return (
    <>
      <DataSourceWithRender
        getData={() => getDataFromServer("/users/2")}
        resourceName={"user"}
        render={(resource) => (
          <UserInfo user={resource} />
        )}></DataSourceWithRender>

      <DataSource
        getData={() => getDataFromLocalStorage("test")}
        resourceName={"msg"}>
        <Message />
      </DataSource>
    </>
  );
}

export default App;
```
