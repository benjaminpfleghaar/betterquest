export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_3rem] animate-pulse">
      <div className="rounded-2xl bg-stone-300">
        <div className="aspect-square"></div>
      </div>
      <ul className="flex flex-row justify-center gap-2 lg:flex-col lg:justify-start">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="size-12 rounded-full bg-stone-300"></li>
        ))}
      </ul>
    </div>
  );
}
