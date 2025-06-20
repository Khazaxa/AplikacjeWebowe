import { useNavigate } from "react-router-dom";
import returnImg from "../../assets/return.svg";

export default function ReturnBtn() {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-secondary"
      onClick={() => navigate(-1)}
      style={{ margin: "10px" }}
    >
      <img
        src={returnImg}
        alt="Return"
        style={{ width: "20px", height: "20px" }}
      />
    </button>
  );
}
