export default function HoverText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-200 hover:-translate-y-1 hover:text-space-accent"
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}