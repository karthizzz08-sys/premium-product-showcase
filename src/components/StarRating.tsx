import { Star } from "lucide-react";

export const StarRating = ({ rating, reviews }: { rating: number; reviews: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i <= Math.round(rating)
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{rating}</span>
      <span className="text-sm text-muted-foreground">
        ({reviews.toLocaleString()} reviews)
      </span>
    </div>
  );
};
