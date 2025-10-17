import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import CommentsSection from "@/components/blog/CommentsSection";
import PracticeQuiz from "@/components/blog/PracticeQuiz";
import { getArticle, deleteArticle } from "@/services/article";
import { generatePractice, QuizQuestion } from "@/services/practice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, Brain, Loader2 } from "lucide-react";
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
  const [practiceQuestions, setPracticeQuestions] = useState<QuizQuestion[] | null>(null);
  const [isPracticeLoading, setIsPracticeLoading] = useState(false);
  const [practiceError, setPracticeError] = useState<string | null>(null);
  
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

  const handleStartPractice = async () => {
    if (!article) return;
    
    try {
      setIsPracticeLoading(true);
      setPracticeError(null);
      const response = await generatePractice(article.title, article.content);
      setPracticeQuestions(response.output.questions);
    } catch (error: any) {
      setPracticeError(error.message || "Erro ao gerar prática");
      toast({
        title: "Erro ao gerar prática",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsPracticeLoading(false);
    }
  };

  const handleCompletePractice = () => {
    toast({
      title: "Prática concluída!",
      description: "Parabéns! Você acertou todas as questões.",
    });
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

          {/* Practice Button */}
          <div className="mx-auto max-w-3xl mt-8">
            {!practiceQuestions && !isPracticeLoading && (
              <Button
                onClick={handleStartPractice}
                className="w-full"
                size="lg"
              >
                <Brain className="w-5 h-5 mr-2" />
                Praticar
              </Button>
            )}

            {isPracticeLoading && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Gerando prática...</span>
                </div>
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-3/4 rounded-lg" />
              </div>
            )}
            
            {practiceQuestions && (
              <PracticeQuiz
                questions={practiceQuestions}
                onComplete={handleCompletePractice}
              />
            )}
          </div>

          <div className="mx-auto max-w-3xl">
            <CommentsSection articleId={article.id} />
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
