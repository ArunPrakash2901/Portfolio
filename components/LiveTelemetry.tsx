import 'server-only';

import { formatDistanceToNow } from 'date-fns';

interface GitHubCommit {
  sha: string;
  message: string;
  url: string;
}

interface GitHubRepo {
  name: string;
}

interface GitHubPushPayload {
  head: string;
  commits?: GitHubCommit[];
}

interface GitHubPushEvent {
  id: string;
  type: 'PushEvent';
  created_at: string;
  repo: GitHubRepo;
  payload: GitHubPushPayload;
}

interface GitHubCommitResponse {
  sha: string;
  html_url: string;
  commit: {
    message: string;
  };
}

interface LatestActivity {
  repo: string;
  message: string;
  url: string;
  timestamp: string;
}

const GITHUB_EVENTS_URL = 'https://api.github.com/users/ArunPrakash2901/events?per_page=100';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isGitHubCommit(value: unknown): value is GitHubCommit {
  return (
    isRecord(value) &&
    typeof value.sha === 'string' &&
    typeof value.message === 'string' &&
    typeof value.url === 'string'
  );
}

function isGitHubPushEvent(value: unknown): value is GitHubPushEvent {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.type === 'PushEvent' &&
    typeof value.created_at === 'string' &&
    isRecord(value.repo) &&
    typeof value.repo.name === 'string' &&
    isRecord(value.payload) &&
    typeof value.payload.head === 'string' &&
    (value.payload.commits === undefined ||
      (Array.isArray(value.payload.commits) && value.payload.commits.every(isGitHubCommit)))
  );
}

function isGitHubCommitResponse(value: unknown): value is GitHubCommitResponse {
  return (
    isRecord(value) &&
    typeof value.sha === 'string' &&
    typeof value.html_url === 'string' &&
    isRecord(value.commit) &&
    typeof value.commit.message === 'string'
  );
}

async function fetchLatestActivity(): Promise<LatestActivity | null> {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(GITHUB_EVENTS_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return null;
    }

    const pushEvents = data.filter(isGitHubPushEvent);
    const latestPushEvent = pushEvents[0];

    if (!latestPushEvent) {
      return null;
    }

    const commitResponse = await fetch(
      `https://api.github.com/repos/${latestPushEvent.repo.name}/commits/${latestPushEvent.payload.head}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!commitResponse.ok) {
      return null;
    }

    const commitData: unknown = await commitResponse.json();

    if (!isGitHubCommitResponse(commitData)) {
      return null;
    }

    const repo = latestPushEvent.repo.name.split('/')[1] ?? latestPushEvent.repo.name;
    const firstLine = commitData.commit.message.split('\n')[0]?.trim();
    const message = firstLine || commitData.commit.message.trim();
    const timestamp = new Date(latestPushEvent.created_at);

    if (Number.isNaN(timestamp.getTime())) {
      return null;
    }

    return {
      repo,
      message,
      url: commitData.html_url,
      timestamp: latestPushEvent.created_at,
    };
  } catch {
    return null;
  }
}

export default async function LiveTelemetry() {
  const activity = await fetchLatestActivity();

  if (!activity) {
    return (
      <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-stone-100 px-1.5 py-1.5 pr-4 text-xs shadow-sm">
        <div className="flex items-center gap-2 rounded-full bg-stone-200 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-stone-400" aria-hidden="true" />
          <span className="text-[10px] font-sans font-bold tracking-wider text-stone-500">
            SYSTEM IDLE
          </span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={activity.url}
      target="_blank"
      rel="noreferrer"
      className="group mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-stone-800 bg-stone-900 px-1.5 py-1.5 pr-4 text-xs text-stone-300 shadow-sm transition-all hover:border-stone-700 hover:bg-stone-800/80"
    >
      <div className="flex items-center gap-2 rounded-full bg-stone-800 px-3 py-1">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[10px] font-sans font-bold tracking-wider text-stone-300">
          LATEST COMMIT
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-2 overflow-hidden">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-stone-400"
          fill="currentColor"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 4.87c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
        <span className="shrink-0 font-mono font-medium text-stone-200">
          {activity.repo}
        </span>
        <span className="shrink-0 text-stone-600">/</span>
        <span className="min-w-0 max-w-[150px] truncate font-sans text-stone-400 transition-colors group-hover:text-stone-300 sm:max-w-[200px]">
          {activity.message}
        </span>
        <span className="ml-2 shrink-0 font-mono text-[10px] text-stone-500">
          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
        </span>
      </div>
    </a>
  );
}
