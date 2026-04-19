import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const Header = () => {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-premium flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold">A</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight">Aurora</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Shop</a>
          <a href="#" className="hover:text-foreground transition-colors">iPhone</a>
          <a href="#" className="hover:text-foreground transition-colors">Mac</a>
          <a href="#" className="hover:text-foreground transition-colors">Support</a>
        </nav>

        <button
          onClick={openCart}
          className="relative p-2 rounded-full hover:bg-secondary transition-colors group"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
          {itemCount > 0 && (
            <span
              key={itemCount}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-bounce-subtle shadow-glow"
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
