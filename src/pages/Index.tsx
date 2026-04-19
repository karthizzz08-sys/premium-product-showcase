import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDetails } from "@/components/ProductDetails";
import { CartDrawer } from "@/components/CartDrawer";
import { product } from "@/data/product";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background pb-24 md:pb-0">
        <Header />
        <main className="container py-8 md:py-14">
          <nav className="text-sm text-muted-foreground mb-6">
            <a href="#" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-foreground">iPhone</a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery images={product.images} alt={product.name} />
            <ProductDetails />
          </div>
        </main>

        <footer className="border-t border-border mt-10">
          <div className="container py-8 text-center text-xs text-muted-foreground">
            © 2025 Aurora Store · Premium tech, delivered.
          </div>
        </footer>

        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default Index;
