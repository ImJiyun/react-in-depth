// import { CurrentUserLoader } from "./components/current-user-loader";
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
      {/* <UserLoader userId={"1"}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={"2"}>
        <UserInfo />
      </UserLoader>
      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>

      <ResourceLoader resourceUrl={"/users/2"} resourceName={"user"}>
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl={"/books/1"} resourceName={"book"}>
        <BookInfo />
      </ResourceLoader> */}
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
