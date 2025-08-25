import salad from "../images/salad.jpg";

const Salad = () => {
  return (
    <div className="item-page">
      <h2>Salad</h2>
      <img src={salad} alt="Salad" className="menu-image" />
    </div>
  );
};

export default Salad;