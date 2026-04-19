import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/product";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckoutDialog } from "./CheckoutDialog";

export const CartDrawer = () => {
  const { items, isOpen, closeCart, total, updateQuantity, removeItem } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
        <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="px-6 py-5 border-b">
            <SheetTitle className="font-display text-xl flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart ({items.length})
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add something premium to get started
              </p>
              <Button onClick={closeCart} variant="outline" className="mt-6 rounded-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-2xl border border-border hover:shadow-soft transition-shadow animate-fade-in"
                  >
                    <div className="h-20 w-20 rounded-xl gradient-hero flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm leading-tight">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center rounded-full border border-border h-8">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold tabular-nums">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t bg-secondary/30 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-bold tabular-nums">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping & taxes calculated at checkout
                </p>
                <Button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full h-12 rounded-full text-base font-semibold gradient-premium hover:opacity-90 transition-opacity"
                >
                  Checkout — {formatPrice(total)}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        amount={total}
      />
    </>
  );
};
