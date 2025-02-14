function ShareButton({ fill }) {
  return (
    <>
      <div className="flex justify-center cursor-pointer">
        <svg
          width={"130px"}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 120 70"
          enableBackground="new 0 0 100 100"
          xmlSpace="preserve"
        >
          <g>
            <rect fill={fill} width="75" height="10" x="20" />
            <rect fill={fill} width="10" height="10" x="15" y="5" />
            <rect fill={fill} width="10" height="10" x="10" y="10" />
            <rect fill={fill} width="10" height="10" x="90" y="5" />
            <rect fill={fill} width="10" height="10" x="95" y="10" />
            <rect fill={fill} width="10" height="30" x="5" y="15" />
            <rect fill={fill} width="10" height="30" x="100" y="15" />
            <rect fill={fill} width="10" height="10" x="10" y="40" />
            <rect fill={fill} width="10" height="10" x="15" y="45" />
            <rect fill={fill} width="75" height="10" x="20" y="50" />
            <rect fill={fill} width="10" height="10" x="95" y="40" />
            <rect fill={fill} width="10" height="10" x="90" y="45" />
          </g>
        </svg>
        <div className="absolute font-start text-[#333333] mt-5">SHARE</div>
      </div>
    </>
  );
}

export default ShareButton;
