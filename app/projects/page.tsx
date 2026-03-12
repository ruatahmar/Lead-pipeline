import { Sidebar } from '@/components/Sidebar';
import Projects from '@/components/Projects';

export default function ProjectsPage() {
    return (
        <div className="h-screen bg-[#050505] text-white flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Projects />
            </main>
        </div>
    );
}