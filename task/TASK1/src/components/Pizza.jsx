import pizza from "../images/pizza.jpg";

const Pizza = () => {
  return (
    <div className="item-page">
      <h2>Pizza</h2>
      <img src={pizza} alt="Pizza" className="menu-image" />
    </div>
  );
};

export default Pizza;
