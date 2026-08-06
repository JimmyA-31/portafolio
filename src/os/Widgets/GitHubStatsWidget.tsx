import { useEffect, useState } from 'react';
import { GithubLogo, Star, FolderSimple, Users } from '@phosphor-icons/react';
import './GitHubStatsWidget.css';

interface GitHubUser {
  public_repos: number;
  followers: number;
  created_at: string;
}

export default function GitHubStatsWidget() {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    fetch('https://api.github.com/users/JimmyA-31')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API error');
        return res.json();
      })
      .then((json: GitHubUser) => {
        if (!cancelled) {
          setData(json);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'error') return null;

  const memberSince = data ? new Date(data.created_at).getFullYear() : '—';

  return (
    <div className="github-stats-widget">
      <div className="github-stats-header">
        <GithubLogo size={16} weight="regular" color="var(--os-glow)" />
        <span>github.com/JimmyA-31</span>
      </div>

      {status === 'loading' ? (
        <p className="github-stats-loading">cargando datos...</p>
      ) : (
        <div className="github-stats-grid">
          <div className="github-stats-item">
            <FolderSimple size={14} color="var(--os-accent)" />
            <span>{data?.public_repos} repos</span>
          </div>
          <div className="github-stats-item">
            <Users size={14} color="var(--os-accent)" />
            <span>{data?.followers} seguidores</span>
          </div>
          <div className="github-stats-item">
            <Star size={14} color="var(--os-accent)" />
            <span>desde {memberSince}</span>
          </div>
        </div>
      )}
    </div>
  );
}