import { useState } from "react";
import { product, formatPrice } from "@/data/product";
import { StarRating } from "./StarRating";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, Zap, Loader2, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CheckoutDialog } from "./CheckoutDialog";

export const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const { addToCart, openCart } = useCart();

  const discount = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  const handleAdd = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(qty);
      setAdding(false);
      toast.success(`Added ${qty} × ${product.name} to cart`, {
        description: "Tap the cart icon to checkout",
        action: { label: "View Cart", onClick: openCart },
      });
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Stock badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
          <Check className="h-3.5 w-3.5" /> In Stock
        </span>
        <span className="text-xs text-muted-foreground">Free delivery by tomorrow</span>
      </div>

      {/* Title */}
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          {product.name}
        </h1>
        <p className="mt-2 text-muted-foreground text-lg">{product.tagline}</p>
      </div>

      <StarRating rating={product.rating} reviews={product.reviews} />

      {/* Price */}
      <div className="flex items-end gap-3 flex-wrap">
        <span className="font-display text-4xl font-bold tabular-nums">
          {formatPrice(product.discountPrice)}
        </span>
        <span className="text-xl text-muted-foreground line-through tabular-nums mb-1">
          {formatPrice(product.price)}
        </span>
        <span className="px-2.5 py-1 rounded-full gradient-accent text-accent-foreground text-xs font-bold mb-1">
          SAVE {discount}%
        </span>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Highlights */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {product.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Quantity & Actions */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold">Quantity</span>
          <QuantitySelector value={qty} onChange={setQty} />
        </div>

        <div className="hidden md:flex gap-3">
          <Button
            onClick={handleAdd}
            disabled={adding}
            variant="outline"
            className="flex-1 h-14 rounded-full text-base font-semibold border-2 hover:bg-secondary transition-all"
          >
            {adding ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <ShoppingBag className="h-5 w-5 mr-2" />
            )}
            Add to Cart
          </Button>
          <Button
            onClick={() => setBuyOpen(true)}
            className="flex-1 h-14 rounded-full text-base font-semibold gradient-premium hover:opacity-90 hover:scale-[1.02] transition-all"
          >
            <Zap className="h-5 w-5 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
        {[
          { icon: Truck, label: "Free Delivery" },
          { icon: ShieldCheck, label: "1 Year Warranty" },
          { icon: RotateCcw, label: "10-Day Returns" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1.5">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Long description */}
      <div className="pt-4 border-t border-border">
        <h3 className="font-display text-lg font-bold mb-2">About this product</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.longDescription}
        </p>
      </div>

      <CheckoutDialog
        open={buyOpen}
        onOpenChange={setBuyOpen}
        amount={product.discountPrice * qty}
      />

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border p-3 flex gap-2 shadow-premium">
        <Button
          onClick={handleAdd}
          disabled={adding}
          variant="outline"
          className="flex-1 h-12 rounded-full font-semibold border-2"
        >
          {adding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ShoppingBag className="h-4 w-4 mr-1.5" /> Add
            </>
          )}
        </Button>
        <Button
          onClick={() => setBuyOpen(true)}
          className="flex-1 h-12 rounded-full font-semibold gradient-premium"
        >
          <Zap className="h-4 w-4 mr-1.5" /> Buy Now
        </Button>
      </div>
    </div>
  );
};
