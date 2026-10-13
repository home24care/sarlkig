// Green square star boxes; the last box is partially filled for fractional ratings.
export default function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const box = size === "lg" ? "h-[34px] w-[34px]" : "h-[22px] w-[22px]";
  const star = size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5";
  const gap = size === "lg" ? "gap-[3px]" : "gap-[2px]";
  return (
    <div className={`flex ${gap}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <span
            key={i}
            className={`grid place-items-center ${box}`}
            style={{ background: `linear-gradient(90deg, #00b67a ${fill}%, #dcdce6 ${fill}%)` }}
          >
            <svg viewBox="0 0 24 24" className={`${star} fill-white`} aria-hidden>
              <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
