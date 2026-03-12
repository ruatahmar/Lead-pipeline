'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';

export default function DataToolsTab() {
    const { csvData, setCsvData, columnOrder, setColumnOrder } = useAppStore();
    const columns = columnOrder.length > 0 ? columnOrder : Object.keys(csvData[0] || {});

    const [openSection, setOpenSection] = useState<string | null>(null);
    const toggle = (id: string) => setOpenSection(prev => prev === id ? null : id);

    // Sort
    const handleSort = (col: string, asc: boolean) => { };

    // Filter
    const handleFilter = () => { };

    // Hide/Show columns
    const handleToggleColumn = (col: string) => { };

    return (
        <div className="p-4 space-y-6">
            {/* Stats Card */}
            <section>
            </section>

            {/* Sort */}
            <section className="space-y-2">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Sort</h3>
            </section>

            {/* Filter */}
            <section className="space-y-2">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Filter Rows</h3>
            </section>

            {/* Hide/Show Columns */}
            <section className="space-y-2">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Columns</h3>
            </section>
        </div>
    );
}