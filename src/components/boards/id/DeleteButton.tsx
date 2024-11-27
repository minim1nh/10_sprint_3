import { deleteArticlesId } from "@/api/swagger/Article";
import { useRouter } from "next/navigation";
import styles from "@/styles/boards/id/DeleteButton.module.scss";

interface DeleteArticleProps {
  articleId: number;
}

const DeleteArticle: React.FC<DeleteArticleProps> = ({ articleId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("이 게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteArticlesId(articleId);
      alert("게시글이 삭제되었습니다.");
      router.push("/boards");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      삭제하기
    </button>
  );
};

export default DeleteArticle;
