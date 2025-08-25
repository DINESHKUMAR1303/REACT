import burger from "../images/burger.jpg";

const Burger = () => {
  return (
    <div className="item-page">
      <h2>Burger</h2>
      <img src={burger} alt="Burger" className="menu-image" />
    </div>
  );
};

export default Burger;
