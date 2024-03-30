export default function LineHeightPage() {
  return (
    <div className="w-[500px] space-y-8">
      {[
        "leading-xs",
        "leading-sm",
        "leading-md",
        "leading-lg",
        "leading-xl",
      ].map((className) => {
        return (
          <p key={className} className={className}>
            {`So I started to walk into the water. I won't lie to you boys, I was
            terrified. But I pressed on, and as I made my way past the breakers
            a strange calm came over me. I don't know if it was divine
            intervention or the kinship of all living things but I tell you
            Jerry at that moment, I was a marine biologist.`}
          </p>
        );
      })}
    </div>
  );
}
