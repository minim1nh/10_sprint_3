import { deleteCommentsId } from "@/api/swagger/Comment";
import Image from "next/image";

interface DeleteCommentsProps {
  commentId: number;
  onDelete: () => void;
}

const DeleteComments: React.FC<DeleteCommentsProps> = ({
  commentId,
  onDelete,
}) => {
  const handleDelete = async () => {
    const confirmDelete = confirm("이 댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteCommentsId(commentId);
      alert("댓글이 삭제되었습니다.");
      onDelete();
    } catch {
      alert("본인의 댓글만 삭제할 수 있습니다.");
    }
  };

  return (
    <button onClick={handleDelete}>
      <Image
        src="/images/icon/ic_delete.svg"
        alt="delete"
        width={20}
        height={20}
      />
    </button>
  );
};

export default DeleteComments;
