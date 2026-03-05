"use client";

import React, { useState } from 'react';
import {
    Home,
    CreditCard,
    Users,
    BarChart2,
    Settings,
    Search,
    Bell,
    HelpCircle,
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StripeChart } from '@/components/StripeChart';
import mockPaymentsData from '@/lib/mockPayments.json';
import { toPng } from 'html-to-image';

interface Payment {
    id: string;
    amount: number;
    status: string;
    email: string;
    date: string;
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('payments');
    const [grossVolume, setGrossVolume] = useState(12490.00);
    const [payments, setPayments] = useState<Payment[]>(mockPaymentsData);
    const [isEditing, setIsEditing] = useState(false);

    const downloadScreenshot = async () => {
        const node = document.getElementById('stripe-dashboard-container');
        if (!node) return;

        try {
            const dataUrl = await toPng(node, {
                pixelRatio: 2,
                backgroundColor: '#F7F9FC',
            });
            const link = document.createElement('a');
            link.download = `stripe-replica-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Export failed', err);
        }
    };

    return (
        <div id="stripe-dashboard-container" className="flex h-screen bg-stripe-bg font-stripe text-stripe-text overflow-hidden">
            {/* Sidebar */}
            <aside className="w-[240px] border-r border-stripe-border bg-white flex flex-col">
                <div className="p-4 flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-stripe-purple rounded shadow-sm flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Replica</span>
                    <ChevronDown className="w-4 h-4 text-stripe-secondary" />
                </div>

                <nav className="flex-1 px-3 space-y-0.5">
                    <NavItem icon={<Home className="w-4 h-4" />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
                    <NavItem icon={<CreditCard className="w-4 h-4" />} label="Payments" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
                    <NavItem icon={<BarChart2 className="w-4 h-4" />} label="Balances" />
                    <NavItem icon={<Users className="w-4 h-4" />} label="Customers" />
                    <NavItem icon={<BarChart2 className="w-4 h-4" />} label="Reports" />
                </nav>

                <div className="p-4 border-t border-stripe-border">
                    <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-12 border-b border-stripe-border bg-white flex items-center justify-between px-6 shrink-0">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 text-stripe-secondary">
                            <Search className="w-4 h-4" />
                            <span className="text-sm">Search...</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <HelpCircle className="w-4 h-4 text-stripe-secondary" />
                        <Bell className="w-4 h-4 text-stripe-secondary" />
                        <div className="w-6 h-6 rounded-full bg-stripe- purple/10 flex items-center justify-center text-[10px] font-bold text-stripe-purple">
                            NG
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <main className="flex-1 overflow-auto flex p-6 gap-6">
                    {/* Left Panel: Payment Feed (40%) */}
                    <section className="w-[40%] flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold">Payments</h2>
                            <button className="text-sm text-stripe-purple font-medium">View all</button>
                        </div>

                        <div className="stripe-card flex-1 overflow-auto">
                            <div className="divide-y divide-stripe-border">
                                {payments.map((p) => (
                                    <div key={p.id} className="p-4 hover:bg-stripe-bg transition-colors cursor-pointer flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold tracking-tight text-[#1A1F36]">${p.amount.toFixed(2)}</span>
                                                <div className="status-badge-succeeded text-[10px] py-0 px-1.5 flex items-center gap-1 leading-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-stripe-purple" />
                                                    Succeeded
                                                </div>
                                            </div>
                                            <div className="text-xs text-stripe-secondary">{p.email} • {p.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right Panel: Metric Detail (60%) */}
                    <section className="w-[60%] flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-bold">Gross volume</h2>
                            <div className="flex gap-2">
                                <button className="text-xs px-2 py-1 bg-white border border-stripe-border rounded text-stripe-secondary transition-colors hover:border-[#8B5CF6]/50">7 days</button>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-xs px-2 py-1 bg-white border border-stripe-border rounded text-stripe-secondary transition-colors hover:border-[#8B5CF6]/50"
                                >
                                    {isEditing ? 'Close editor' : 'Edit data'}
                                </button>
                                <button
                                    onClick={downloadScreenshot}
                                    className="text-xs px-2 py-1 bg-stripe-purple text-white rounded font-bold transition-opacity hover:opacity-90 shadow-sm"
                                >
                                    Export PNG
                                </button>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="stripe-card p-4 mb-4 bg-stripe-purple/5 border-stripe-purple/20 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="text-[10px] uppercase font-bold text-stripe-secondary block mb-1">Gross Volume ($)</label>
                                        <input
                                            type="number"
                                            value={grossVolume}
                                            onChange={(e) => setGrossVolume(Number(e.target.value))}
                                            className="w-full bg-white border border-stripe-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-stripe-purple"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <button
                                            onClick={() => setPayments([
                                                { id: Date.now().toString(), amount: Math.random() * 500, status: 'succeeded', email: 'new@customer.com', date: 'Just now' },
                                                ...payments
                                            ])}
                                            className="w-full mt-5 bg-stripe-purple text-white rounded px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-90"
                                        >
                                            Add Random Payment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div id="dashboard-screenshot-area" className="stripe-card p-6 h-[300px] flex flex-col">
                            <div className="mb-4">
                                <div className="text-2xl font-bold tracking-tight text-stripe-purple">${grossVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                <div className="text-xs text-stripe-secondary">Mar 1 - Mar 7, 2026</div>
                            </div>
                            <div className="flex-1">
                                <StripeChart />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="stripe-card p-4">
                                <div className="text-xs text-stripe-secondary mb-1">Net volume from sales</div>
                                <div className="text-lg font-bold">$11,842.20</div>
                            </div>
                            <div className="stripe-card p-4">
                                <div className="text-xs text-stripe-secondary mb-1">New customers</div>
                                <div className="text-lg font-bold">42</div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-2.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                active
                    ? "bg-stripe-purple/[0.08] text-stripe-purple shadow-[inset_0_0_0_1px_rgba(139,92,246,0.1)]"
                    : "text-stripe-secondary hover:text-stripe-text hover:bg-stripe-bg"
            )}
        >
            <span className={cn(active ? "text-stripe-purple" : "text-stripe-secondary")}>
                {icon}
            </span>
            {label}
        </button>
    );
}
