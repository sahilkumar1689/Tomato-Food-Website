import { createContext, useReducer, useState, useEffect } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

// Create an store with default data template:
export const DataStorage = createContext({
  originalFoodList: [],
  cartCount: {},
  setCartCount: () => {},
  addToCart: () => {},
  deleteToCart: () => {},
  category: "",
  setCategory: () => {},
  getCartAmountandCount: () => {},
  tkn: "",
  setTkn: () => {},
  odrId: "",
  setOdrId: () => {},
});

// // Reducer Function:
// function reducer(currentState, action) {
//   let newState = currentState;

//   return newState;
// }

// Create a Wrapper Component:
function StoreProvider({ children }) {
  // 1. Display Food Items = Create a useReducer for further scalability if necesssary ,but you can also use useState hook:
  // const [food_lists, setFoodLists] = useReducer(reducer, food_list);

  const [originalFoodList, setOriginalList] = useState([]);

  // 2. Cart Count = Create a state to handle the cartCount of all items:
  const [cartCount, setCartCount] = useState({});

  const addToCart = async (itemId) => {
    if (!cartCount[itemId]) {
      setCartCount((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartCount((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (tkn) {
      const response = await axios.post(
        "/api/v3/addToCart",
        { itemId },
        { headers: { token: tkn } }
      );
      // console.log(response.data);
    }
  };

  const deleteToCart = async (itemId) => {
    setCartCount((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (tkn) {
      const response = await axios.post(
        "/api/v3/deleteFromCart",
        { itemId },
        { headers: { token: tkn } }
      );
      // console.log(response.data);
    }
  };

  // const loadCartData = async (currToken) => {
  //   const response = await axios.get(
  //     "/api/v3/getCart",
  //     {},
  //     { headers: { token: currToken } }
  //   );
  // };

  // 3. Items Filteration = Create a state to handle the items filteration.
  const [category, setCategory] = useState("All");

  // 4. Get the cart amount and the count of items:
  const getCartAmountandCount = () => {
    let amount = 0;
    let count = 0;
    for (const item in cartCount) {
      if (cartCount[item] > 0) {
        count += cartCount[item];
        let elem = originalFoodList.find((product) => product._id === item);
        amount += elem.price * cartCount[item];
      }
    }
    return { amount, count };
  };

  // 5. Handle the user token:
  const [tkn, setTkn] = useState("");

  useEffect(() => {
    // Get the food list from the backend:
    (async () => {
      const response = await axios.get("/api/v1/listData");
      // console.log(response.data.data.lists);
      setOriginalList(response.data.data.lists);
    })();

    // Get the cart data from the backend:
    if (localStorage.getItem("token")) {
      setTkn(localStorage.getItem("token"));

      let curTkn = localStorage.getItem("token");
      (async () => {
        const response = await axios.get("/api/v3/getCart", {
          headers: { token: curTkn },
        });
        // console.log(response.data.data.cartData);
        setCartCount(response.data.data.cartData);
      })();
    }

    // console.log(originalFoodList);
  }, []);

  // Store the object Id given by the database:
  const [odrId, setOdrId] = useState();

  return (
    <>
      <DataStorage.Provider
        value={{
          originalFoodList,
          cartCount,
          setCartCount,
          addToCart,
          deleteToCart,
          category,
          setCategory,
          getCartAmountandCount,
          tkn,
          setTkn,
          odrId,
          setOdrId,
        }}
      >
        {children}
      </DataStorage.Provider>
    </>
  );
}

export default StoreProvider;
