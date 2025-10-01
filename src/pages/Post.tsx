import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import CommentsSection from "@/components/blog/CommentsSection";
import { getArticle } from "@/services/article";
import { useToast } from "@/hooks/use-toast";

const Post = () => {
  const { slug: id } = useParams();
  const { toast } = useToast();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    </div>
  );
};

export default Post;
