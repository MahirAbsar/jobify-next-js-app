import { Layers, AreaChart, AppWindow } from "lucide-react";

type TNavlinks = {
    href: string;
    label: string;
    icon: React.ReactNode
}

export const links: TNavlinks[] = [
    {
        href: '/add-job',
        label: 'add job',
        icon: <Layers />
    },
    {
        href: '/jobs',
        label: 'jobs',
        icon: <AppWindow />
    },
    {
        href: '/stats',
        label: 'stats',
        icon: <AreaChart />
    },
]