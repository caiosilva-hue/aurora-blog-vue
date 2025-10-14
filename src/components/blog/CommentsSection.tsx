import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { getComments, createComment, updateComment, deleteComment } from "@/services/comments";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
}

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    setIsLoggedIn(!!token);
    setCurrentUserId(userId);
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    try {
      const data = await getComments(articleId);
      setComments(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar comentários",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment(newComment, articleId);
      setNewComment("");
      await loadComments();
      toast({
        title: "Comentário adicionado",
        description: "Seu comentário foi publicado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar comentário",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (commentId: number) => {
    if (!editContent.trim()) return;

    try {
      await updateComment(commentId, editContent);
      setEditingId(null);
      setEditContent("");
      await loadComments();
      toast({
        title: "Comentário atualizado",
        description: "Seu comentário foi atualizado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar comentário",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm("Tem certeza que deseja excluir este comentário?")) return;

    try {
      await deleteComment(commentId);
      await loadComments();
      toast({
        title: "Comentário excluído",
        description: "Seu comentário foi removido com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir comentário",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-blog-title">
        Comentários ({comments.length})
      </h2>

      {/* Comment Form */}
      {isLoggedIn ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Deixe seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>
                Comentar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-6">
          <p className="text-blog-text-light text-center">
            <a href="/login" className="text-primary hover:underline">
              Faça login
            </a>{" "}
            para comentar
          </p>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="p-8">
            <p className="text-center text-blog-text-light">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-blog-title">
                        Usuário
                      </span>
                      <span className="flex items-center gap-1 text-xs text-blog-text-light">
                        <Calendar className="h-3 w-3" />
                        {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {currentUserId === comment.user_id && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(comment.id);
                            setEditContent(comment.content);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {editingId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(comment.id)}>
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(null);
                            setEditContent("");
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-blog-text">{comment.content}</p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
