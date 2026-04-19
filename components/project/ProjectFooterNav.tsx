import Link from 'next/link';

export default function ProjectFooterNav() {
  return (
    <nav className="px-8 py-12 md:py-20 border-t border-[#E0DAD0] bg-[#F7F4EF]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-[13px] font-medium text-[#5A5650] hover:text-[#1A1814] transition-colors flex items-center gap-2">
          ← Back to Portfolio
        </Link>
        <div className="flex gap-8">
          <Link href="/#projects" className="text-[13px] font-medium text-[#5A5650] hover:text-[#1A1814] transition-colors">
            View All Projects
          </Link>
          <Link href="/#built-for-fun" className="text-[13px] font-medium text-[#5A5650] hover:text-[#1A1814] transition-colors">
            View All Experiments
          </Link>
        </div>
      </div>
    </nav>
  );
}
