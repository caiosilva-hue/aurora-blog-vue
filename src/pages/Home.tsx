import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import Carousel from "@/components/blog/Carousel";

// Mock data - will be replaced with API integration
const featuredPosts = [
  {
    slug: "introducao-react-hooks",
    title: "Introdução aos React Hooks: Um Guia Completo",
    excerpt: "Aprenda a usar hooks do React para criar componentes mais limpos e funcionais. Descubra useState, useEffect e muito mais.",
    author: "Maria Silva",
    date: "15 Mar 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
  },
  {
    slug: "design-system-tailwind",
    title: "Criando um Design System com Tailwind CSS",
    excerpt: "Construa um design system escalável e consistente usando Tailwind CSS. Melhore a produtividade do seu time.",
    author: "João Santos",
    date: "12 Mar 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
  },
  {
    slug: "typescript-para-iniciantes",
    title: "TypeScript para Iniciantes: Do Zero ao Avançado",
    excerpt: "Domine TypeScript e leve seu JavaScript para o próximo nível com tipagem estática e recursos avançados.",
    author: "Ana Costa",
    date: "10 Mar 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop",
  },
];

const allPosts = [
  ...featuredPosts,
  {
    slug: "performance-web",
    title: "Otimizando Performance Web: Técnicas Essenciais",
    excerpt: "Descubra as melhores práticas para melhorar a performance do seu site e proporcionar uma experiência rápida aos usuários.",
    author: "Pedro Oliveira",
    date: "8 Mar 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    slug: "api-rest-nodejs",
    title: "Construindo APIs REST Profissionais com Node.js",
    excerpt: "Aprenda a criar APIs robustas e escaláveis usando Node.js, Express e as melhores práticas do mercado.",
    author: "Carlos Mendes",
    date: "5 Mar 2024",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
  },
  {
    slug: "css-grid-flexbox",
    title: "CSS Grid vs Flexbox: Quando Usar Cada Um",
    excerpt: "Entenda as diferenças entre CSS Grid e Flexbox e saiba escolher a melhor ferramenta para cada layout.",
    author: "Fernanda Lima",
    date: "2 Mar 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
  },
];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Featured Section */}
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

        {/* All Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-blog-title">
              Todos os Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <PostCard key={post.slug} {...post} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
