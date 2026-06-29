import type { Metadata } from 'next';
import ProjectDashboard from '@/components/dashboard/ProjectDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Ivan Manrique',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <ProjectDashboard />;
}
