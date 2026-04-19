import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, FormEvent } from "react";
import { formatPrice } from "@/data/product";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  amount: number;
}

export const CheckoutDialog = ({ open, onOpenChange, amount }: Props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const { closeCart } = useCart();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Order placed successfully!", {
        description: `We'll contact ${form.name} shortly.`,
      });
      setTimeout(() => {
        onOpenChange(false);
        closeCart();
        setSuccess(false);
        setForm({ name: "", phone: "", address: "" });
      }, 1800);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="py-10 text-center animate-scale-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h3 className="font-display text-2xl font-bold">Order Confirmed</h3>
            <p className="text-muted-foreground mt-2">
              Thank you, {form.name}. Your order is on its way.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Quick Checkout</DialogTitle>
              <DialogDescription>
                Total: <span className="font-bold text-foreground">{formatPrice(amount)}</span>
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  pattern="[0-9+\s-]{7,}"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="h-11 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street, City, State, PIN"
                  rows={3}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full text-base font-semibold gradient-premium hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  `Place Order — ${formatPrice(amount)}`
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
