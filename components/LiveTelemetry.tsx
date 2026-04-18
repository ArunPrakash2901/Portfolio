'use client';
import { useEffect, useState } from 'react';

interface CommitData {
  repo: string;
  message: string;
  sha: string;
  url: string;
  timeAgo: string;
  isActive: boolean;
}

export default function LiveTelemetry() {
  const [commit, setCommit] = useState<CommitData | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/ArunPrakash2901/events/public?per_page=100')
      .then(res => res.json())
      .then(events => {
        if (!Array.isArray(events)) throw new Error("Invalid API response");

        const pushEvent = events.find((e: any) => e.type === 'PushEvent' && e.payload?.commits?.length > 0);
        
        if (pushEvent) {
          const latestCommit = pushEvent.payload.commits.reverse()[0];
          const repoName = pushEvent.repo.name.split('/')[1];
          let rawMessage = latestCommit.message.split('\n')[0];
          
          const diff = Math.floor((new Date().getTime() - new Date(pushEvent.created_at).getTime()) / 60000);
          let timeStr = '';
          if (diff < 60) timeStr = `${diff}m ago`;
          else if (diff < 1440) timeStr = `${Math.floor(diff / 60)}h ago`;
          else timeStr = `${Math.floor(diff / 1440)}d ago`;

          setCommit({
            repo: repoName.replace(/-/g, ' '),
            message: rawMessage,
            sha: latestCommit.sha.substring(0, 7),
            url: `https://github.com/${pushEvent.repo.name}/commit/${latestCommit.sha}`,
            timeAgo: timeStr,
            isActive: true
          });
        } else {
          // Fallback State
          setCommit({
            repo: 'System Idle',
            message: 'Awaiting next deployment...',
            sha: '-------',
            url: 'https://github.com/ArunPrakash2901',
            timeAgo: 'Standby',
            isActive: false
          });
        }
      })
      .catch(() => {
        setCommit({
          repo: 'Telemetry Offline',
          message: 'Cannot reach GitHub API',
          sha: 'error',
          url: 'https://github.com/ArunPrakash2901',
          timeAgo: '--',
          isActive: false
        });
      });
  }, []);

  if (!commit) return null; // Only blank for the first ~100ms of loading

  return (
    <a 
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group animate-fade-in-up mt-8 inline-flex items-center gap-3 p-1.5 pr-5 bg-stone-50/60 backdrop-blur-md border border-stone-200 rounded-2xl transition-all duration-500 hover:bg-white hover:border-stone-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 relative overflow-hidden max-w-full"
    >
      {/* Live/Standby Badge */}
      <div className="flex items-center gap-2 bg-white border border-stone-100 px-3 py-2 rounded-xl shadow-sm shrink-0 z-10">
        <span className="relative flex h-2 w-2">
          {commit.isActive ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-300"></span>
          )}
        </span>
        <span className="text-[10px] font-bold tracking-widest text-stone-900 uppercase mt-[1px]">
          {commit.isActive ? 'Live' : 'Idle'}
        </span>
      </div>

      {/* Commit Details */}
      <div className="flex items-center gap-2.5 overflow-hidden z-10">
        <span className="text-sm font-semibold text-stone-800 whitespace-nowrap shrink-0">{commit.repo}</span>
        <span className="text-stone-300 shrink-0">/</span>
        <span className="text-sm text-stone-500 truncate min-w-[50px]">{commit.message}</span>
        <span className="hidden sm:inline-block text-xs font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded shrink-0">{commit.sha}</span>
        <span className="text-stone-300 shrink-0">•</span>
        <span className="text-xs font-medium text-stone-400 shrink-0">{commit.timeAgo}</span>
      </div>

      {/* Hover Arrow */}
      <svg className="w-4 h-4 text-stone-300 ml-2 transform transition-all duration-300 group-hover:translate-x-1 group-hover:text-stone-900 shrink-0 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  );
}
