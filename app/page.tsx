'use client';

import { useEffect, useState } from 'react';

type Project = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
};

export default function HomePage(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects(): Promise<void> {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
          const data = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(data.error || 'Failed to fetch projects');
        }
        const data = (await res.json()) as { projects: Project[] };
        setProjects(data.projects);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }
    void fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-medium">Projects</h2>
        <p className="text-sm text-gray-600">A simple read-only list from the database.</p>
      </section>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-md border bg-white">
          <table className="w-full table-auto text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-semibold">ID</th>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">{p.id}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">
                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

