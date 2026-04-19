import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({ value, onChange, min = 1, max = 99 }: Props) => {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background h-12">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center font-semibold tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-secondary transition-colors disabled:opacity-30"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
