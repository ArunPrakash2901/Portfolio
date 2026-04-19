import Link from 'next/link';

export default function ProjectFooterNav({
  prev,
  next,
  collection,
}: {
  prev: any;
  next: any;
  collection: 'experiments' | 'projects';
}) {
  const collectionHref = `/${collection}`;
  const overviewHref = collection === 'experiments' ? '/#built-for-fun' : '/#projects';
  const overviewLabel = collection === 'experiments' ? 'all experiments' : 'all projects';

  return (
    <nav className="bg-[#F7F4EF] grid grid-cols-3 items-center px-8 py-7 border-t-[0.5px] border-[#E0DAD0]">
      <div className="flex flex-col gap-1">
        {prev && (
          <>
            <span className="font-mono text-[9px] text-[#9B8B6E] uppercase tracking-wider">previous</span>
            <Link href={`${collectionHref}/${prev.slug}`} className="text-[13px] text-[#1A1814] hover:underline decoration-[0.5px] underline-offset-4">
              {prev.name}
            </Link>
          </>
        )}
      </div>

      <div className="flex justify-center">
        <Link href={overviewHref} className="border-[0.5px] border-[#E0DAD0] text-[#5A5650] px-4 py-[7px] rounded-[6px] text-[12px] font-medium hover:bg-stone-50 transition-all">
          ↑ {overviewLabel}
        </Link>
      </div>

      <div className="flex flex-col gap-1 items-end text-right">
        {next && (
          <>
            <span className="font-mono text-[9px] text-[#9B8B6E] uppercase tracking-wider">next</span>
            <Link href={`${collectionHref}/${next.slug}`} className="text-[13px] text-[#1A1814] hover:underline decoration-[0.5px] underline-offset-4">
              {next.name}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
