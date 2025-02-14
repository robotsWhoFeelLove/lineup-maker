function ShareIcon() {
  return (
    <div onClick={() => document.getElementById("share-modal").showModal()} className=" text-white h-4 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30" x="0px" y="0px" width="30px">
        <g data-name="Layer 10">
          <path
            fill="white"
            stroke="white"
            d="M20.89941,3.67749a.46691.46691,0,0,0-.77441.35132V7.5h-2.25a9.00005,9.00005,0,0,0-9,9v2.22559a.46687.46687,0,0,0,.896.18383A9.544,9.544,0,0,1,18.54321,13.125H20.125v4.59619a.46691.46691,0,0,0,.77441.35132l7.82422-6.84619a.467.467,0,0,0,0-.70264Z"
          />
          <path
            fill="white"
            stroke="white"
            d="M25,16.61035a.99943.99943,0,0,0-1,1V25a1.00067,1.00067,0,0,1-1,1H6a1.00067,1.00067,0,0,1-1-1V11a1.00067,1.00067,0,0,1,1-1H8.79a1,1,0,0,0,0-2H6a3.00328,3.00328,0,0,0-3,3V25a3.00328,3.00328,0,0,0,3,3H23a3.00328,3.00328,0,0,0,3-3V17.61035A.99943.99943,0,0,0,25,16.61035Z"
          />
        </g>
      </svg>
    </div>
  );
}

export default ShareIcon;
