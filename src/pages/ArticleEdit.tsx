import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getArticle, updateArticle } from "@/services/article";

export default function ArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      const currentUserId = localStorage.getItem("user_id");
      if (!currentUserId) {
        navigate("/login");
        return;
      }

      try {
        setIsFetching(true);
        const data = await getArticle(id);
        const article = data[0];

        if (!article) {
          toast({
            title: "Artigo não encontrado",
            variant: "destructive",
          });
          navigate("/posts");
          return;
        }

        // Verificar se o usuário é o dono do artigo
        if (article.user_id !== currentUserId) {
          toast({
            title: "Acesso negado",
            description: "Você não tem permissão para editar este artigo.",
            variant: "destructive",
          });
          navigate(`/post/${id}`);
          return;
        }

        setTitle(article.title);
        setContent(article.content);
        setImageUrl(article.image_url || "");
      } catch (err: any) {
        toast({
          title: "Erro ao carregar artigo",
          description: err.message,
          variant: "destructive",
        });
        navigate("/posts");
      } finally {
        setIsFetching(false);
      }
    };

    fetchArticle();
  }, [id, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    setIsLoading(true);

    try {
      await updateArticle(id, {
        title,
        content,
        image_url: imageUrl,
      });

      toast({
        title: "Artigo atualizado!",
        description: "Suas alterações foram salvas com sucesso.",
      });
      navigate(`/post/${id}`);
    } catch (err: any) {
      toast({
        title: "Erro ao atualizar artigo",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Carregando artigo...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-blog-title mb-8">Editar Artigo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do artigo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva o conteúdo do seu artigo"
              className="min-h-[300px]"
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(`/post/${id}`)}>
              Cancelar
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
