import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type ProjectResponse = {
  id: number;
  name: string;
  status: string;
  createdAt: string;
};

/**
 * GET /api/projects
 * Returns a list of projects from the database.
 */
export async function GET(): Promise<NextResponse<{ projects: ProjectResponse[] } | { error: string }>> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'asc' }
    });
    const body: ProjectResponse[] = projects.map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      createdAt: p.createdAt.toISOString()
    }));
    return NextResponse.json({ projects: body }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

