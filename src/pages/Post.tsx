import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import CommentsSection from "@/components/blog/CommentsSection";
import { getArticle, deleteArticle } from "@/services/article";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Post = () => {
  const { slug: id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const currentUserId = localStorage.getItem("user_id");
  const isOwner = article && currentUserId && article.user_id === currentUserId;

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await getArticle(id);
        setArticle(data[0]);
      } catch (error: any) {
        toast({
          title: "Erro ao carregar artigo",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, toast]);

  const handleEdit = () => {
    navigate(`/editar-artigo/${id}`);
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      setIsDeleting(true);
      await deleteArticle(id);
      toast({
        title: "Artigo excluído",
        description: "Seu post foi excluído com sucesso.",
      });
      const userId = localStorage.getItem("user_id");
      navigate(`/posts?user_id=${userId}`);
    } catch (error: any) {
      toast({
        title: "Erro ao excluir artigo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Carregando artigo...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Artigo não encontrado</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {isOwner && (
            <div className="flex justify-end gap-2 mb-4 max-w-3xl mx-auto">
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          )}
          
          <PostCard
            slug={article.id}
            title={article.title}
            excerpt={article.content.substring(0, 150) + "..."}
            author="Autor"
            date={new Date(article.created_at).toLocaleDateString('pt-BR')}
            readTime="5 min"
            image={article.image_url}
            variant="full"
          />

          {/* Post Content */}
          <article className="prose prose-lg mx-auto mt-8 max-w-3xl text-blog-text">
            <div className="space-y-4 whitespace-pre-wrap">
              {article.content}
            </div>
          </article>

          {/* Comments */}
          <div className="mx-auto max-w-3xl">
            <CommentsSection comments={[]} />
          </div>
        </div>
      </main>

      <Footer />
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O artigo será permanentemente excluído.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Post;
