import { HudCard } from '../../../components/ui/HudCard';
import { CommandIdentity } from './CommandIdentity';

export function HeroHud() {
    return (
        <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[auto] md:min-h-[600px] pointer-events-none mt-8 md:mt-0">
            {/* Floating HUD Cards - Stack on mobile, Absolute on Desktop */}
            <div className="relative md:absolute inset-0 z-30 pointer-events-none flex flex-col gap-4 md:block">
                {/* Command Identity Block */}
                <CommandIdentity />

                <HudCard label="Active Nodes" value="48" className="relative md:absolute md:top-10 md:right-10 pointer-events-auto" delay={1.4} />
                <HudCard label="Region" value="ap-southeast-1" className="relative md:absolute md:bottom-10 md:right-10 pointer-events-auto" delay={1.5} />
                <HudCard label="Latency" value="24ms" className="relative md:absolute md:bottom-20 md:left-10 pointer-events-auto" delay={1.6} />
            </div>
        </div>
    );
}
