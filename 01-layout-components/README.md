## Design Pattern

### Definition

- Effective solution for common challenges
- Best practices for managing from state
- Function programming in the context of React.js

### Layout Components

- They focus on organizing other components within a web page
- Examples are Split Screen, Lists, Modals
- The core content components of pages, should be unaware and unconcerned about their precise location within the page structure

```jsx
import "./App.css";
import { SplitScreen } from "./components/split-screen";

const LeftSideComp = ({ title }) => {
  return <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>;
};

const RightSideComp = ({ title }) => {
  return <h2 style={{ backgroundColor: "blue" }}>{title}</h2>;
};

function App() {
  return (
    <SplitScreen leftWidth={1} rightWidth={3}>
      <LeftSideComp title={"Right"} />
      <RightSideComp title={"Left"} />
    </SplitScreen>
  );
}

export default App;
```

- Passing sub-components as a chilren is better than as props because...
  - The code gets way leaner
  - We can pass props easily

### Rendering Lists

- List component and Item component seperate concerns

#### List Component

- Handles logic of iterating over an array of items
- By using it, we don't have to re-write `map()` logic every time we need to render a list

```jsx
export const RegularList = ({ items, sourceName, ItemComponent }) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent key={i} {...{ [sourceName]: item }} />
      ))}
    </>
  );
};
```

- `items`: The array of data to be rendered.
- `ItemComponent`: The component used to render each item dynamically.
- `sourceName`: The prop name to pass the item (e.g., "book" or "author").
- `{ ...{ [sourceName]: item } }`: Dynamically assigns the prop name, so it can be flexible.

#### Item Component

- is responsible for rendering a single item from the list
- receives a single item as a prop

`SmallBookListItem`

```jsx
export const SmallBookListItem = ({ book }) => {
  const { name, price } = book;
  return (
    <h2>
      {name} / {price}
    </h2>
  );
};
```

`LargeBookListItem`

```jsx
export const LargeBookListItem = ({ book }) => {
  const { name, price, title, pages } = book;

  return (
    <>
      <h2>{name}</h2>
      <p>{price}</p>
      <h2>Title:</h2>
      <p>{title}</p>
      <p># of Pages: {pages}</p>
    </>
  );
};
```

### Modal component

```jsx
import { useState } from "react";
import { styled } from "styled-components";

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const ModalContent = styled.div`
  margin: 12% auto;
  padding: 24px;
  background-color: white;
  width: 50%;
`;

export const Modal = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Show Modal</button>
      {show && (
        <ModalBackground onClick={() => setShow(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShow(false)}>Hide Modal</button>
            {children}
          </ModalContent>
        </ModalBackground>
      )}
    </>
  );
};
```
