import { shareSchedule } from "../../services/sharingServices";
import { useEventStore } from "../../store/event-store";
import ShareIcon from "./Icons/ShareIcon";

function ShareButton() {
  const currentPage = useEventStore((state) => state.currentPage);
  const handleShareModal = () => {
    document.getElementById("share-modal").showModal();
  };

  return (
    <div className=" flex justify-end ">
      <div
        onClick={handleShareModal}
        className={(currentPage == "selector" ? "rounded-tl-lg border-l " : "") + " bg-neutral border-t rounded-b-none h-8 px-2 rounded-tr-lg"}
      >
        <ShareIcon />
      </div>
    </div>
  );
}

export default ShareButton;
