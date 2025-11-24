import { NextResponse } from 'next/server';

// Server route: fetch public repos for the org and return a simplified list.
export async function GET(req) {
  try {
    const ORG = process.env.GITHUB_ORG || 'MLC-VIT-AP';
    const token = process.env.GITHUB_TOKEN;
    const per_page = 100;
    const url = `https://api.github.com/orgs/${ORG}/repos?per_page=${per_page}`;

    const headers = { Accept: 'application/vnd.github+json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'GitHub API error', details: text }, { status: res.status });
    }

    const repos = await res.json();

    // Exclude the repo for this site (case-insensitive match)
    const exclude = (process.env.EXCLUDE_REPO || 'MLC_web').toLowerCase();

    const simplified = Array.isArray(repos)
      ? repos
          .filter((r) => r && r.name && r.name.toLowerCase() !== exclude)
          .map((r) => ({
            name: r.name,
            description: r.description || '',
            html_url: r.html_url,
            homepage: r.homepage || null,
            language: r.language || null,
            stargazers_count: r.stargazers_count || 0,
          }))
      : [];

    return NextResponse.json({ success: true, repos: simplified }, { status: 200 });
  } catch (err) {
    console.error('Error fetching GitHub repos:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
