import { useNavigate } from "react-router-dom";

function GoBack() {
  const navigate = useNavigate();
  return (
    <div className="w-8 h-8" onClick={() => navigate("/")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 99.082 125"
        enableBackground="new 0 0 99.082 100"
        xmlSpace="preserve"
      >
        <path
          fill="white"
          stroke="white"
          d="M49.54,0C22.198-0.019,0.027,22.375,0,49.973C0.027,77.614,22.198,100.007,49.54,100  c27.352,0.007,49.521-22.386,49.542-50.027C99.062,22.375,76.892-0.019,49.54,0z M70.215,69.348c-1.205,1.908-4.28,1.232-3.25-1.625  c4.793-13.326-5.39-16.074-14.719-16.074c-3.847,0-7.219,0-7.219,0v13.07L21.232,45.037l23.795-19.679v13.07h2.525  C79.646,38.429,75.014,61.749,70.215,69.348z"
        />
      </svg>
    </div>
  );
}

export default GoBack;
