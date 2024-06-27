import { useContext, useRef, useState } from "react";
import "./SearchItem.css";
import { GoArrowLeft } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { menu_list } from "../../assets/assets";
import { DataStorage } from "../../Store/storeContext";

function SearchItem({ setShowSearch }) {
  const refValue = useRef();
  const [showInputMessage, setInputMessage] = useState(0);
  const { setCategory } = useContext(DataStorage);

  let searchData = () => {
    let inputValue = refValue.current.value;
    console.log(inputValue);

    let flag = 0;
    for (let i = 0; i < menu_list.length; i++) {
      if (menu_list[i].menu_name.toLowerCase() === inputValue.toLowerCase()) {
        setCategory(menu_list[i].menu_name);
        setShowSearch(0);
      } else {
        flag = 1;
      }
    }
    if (flag == 1) setInputMessage(1);

    refValue.current.value = "";
  };

  return (
    <>
      <div className="searchContainer">
        <div className="searchCenter">
          <GoArrowLeft className="leftarrow" onClick={() => setShowSearch(0)} />
          <div className="search__container">
            <p className="search__title">Go ahead, search your Dish Category</p>
            <div className="inputContainer">
              <input
                className="search__input"
                type="text"
                placeholder="Search"
                ref={refValue}
              />
              <GoSearch className="searchIcon" onClick={searchData} />
              {showInputMessage === 1 ? (
                <p className="inputResultPara">No Matched Dish Found</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
