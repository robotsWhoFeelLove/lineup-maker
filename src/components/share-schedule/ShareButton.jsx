import { shareSchedule } from "../../services/sharingServices";
import ShareIcon from "./Icons/ShareIcon";

function ShareButton() {
  const handleShareModal = () => {
    document.getElementById("share-modal").showModal();
  };

  return (
    <div className=" flex justify-end">
      <div onClick={handleShareModal} className=" bg-neutral border-none rounded-b-none h-8 px-2 rounded-tr-lg">
        <ShareIcon />
      </div>
    </div>
  );
}

export default ShareButton;
