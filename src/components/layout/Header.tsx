import { Link, useNavigate } from "react-router-dom";
import { Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { logout } from "@/services/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-xl font-bold text-blog-title">Blog</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pesquisar posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Auth Button */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button
                  onClick={() => navigate("/posts")}
                  variant="outline"
                  className="hidden sm:flex"
                >
                  Ver Posts
                </Button>
                <Button
                  onClick={() => navigate("/criar-artigo")}
                  className="hidden sm:flex"
                >
                  Novo Artigo
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate("/posts")} className="sm:hidden">
                      Ver Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/criar-artigo")} className="sm:hidden">
                      Novo Artigo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="pb-4 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
