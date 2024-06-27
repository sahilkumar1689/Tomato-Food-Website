import React, { useContext } from "react";
import "./Menu.css";
import { menu_list } from "../../assets/assets";
import { DataStorage } from "../../Store/storeContext";

const Menu = () => {
  const { category, setCategory } = useContext(DataStorage);

  return (
    <div className="menuContainer" id="menuId">
      <h1>Explore our menu</h1>
      <p className="menuPara">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satify your cravings and elevate your dining experiences, one
        delicious meal at a time.
      </p>

      <div className="menuList">
        {menu_list.map((elem, index) => (
          <div
            onClick={() => setCategory(elem.menu_name)}
            key={index}
            className="listItem"
          >
            <img
              className={category === elem.menu_name ? "activeMenu" : ""}
              src={elem.menu_image}
              alt={"image " + index}
            />
            <p>{elem.menu_name}</p>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
};

export default Menu;
