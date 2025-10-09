import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import Carousel from "@/components/blog/Carousel";
import { Button } from "@/components/ui/button";
import { getArticles } from "@/services/article";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getArticles();
        
        // Pega os últimos 3 posts para destacar
        const latest = data.slice(0, 3).map((article: any) => ({
          slug: article.id,
          title: article.title,
          excerpt: article.content.substring(0, 150) + "...",
          author: "Autor",
          date: new Date(article.created_at).toLocaleDateString('pt-BR'),
          readTime: "5 min",
          image: article.image_url,
        }));
        
        // Todos os posts
        const all = data.map((article: any) => ({
          slug: article.id,
          title: article.title,
          excerpt: article.content.substring(0, 150) + "...",
          author: "Autor",
          date: new Date(article.created_at).toLocaleDateString('pt-BR'),
          readTime: "5 min",
          image: article.image_url,
        }));
        
        setFeaturedPosts(latest);
        setAllPosts(all);
      } catch (error: any) {
        toast({
          title: "Erro ao carregar posts",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {isLoading ? (
          <div className="py-12 flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Carregando posts...</p>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {featuredPosts.length > 0 && (
              <section className="border-b border-border bg-card py-8">
                <div className="container mx-auto px-4">
                  <h2 className="mb-6 text-2xl font-bold text-blog-title">
                    Posts em Destaque
                  </h2>
                  <Carousel>
                    {featuredPosts.map((post) => (
                      <PostCard key={post.slug} {...post} variant="detailed" />
                    ))}
                  </Carousel>
                </div>
              </section>
            )}

            {/* All Posts Grid */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-blog-title">
                    Todos os Posts
                  </h2>
                  {isLoggedIn && (
                    <Link to="/posts">
                      <Button variant="outline">Ver todos os posts</Button>
                    </Link>
                  )}
                </div>
                {allPosts.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allPosts.map((post) => (
                      <PostCard key={post.slug} {...post} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">Nenhum post encontrado</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
