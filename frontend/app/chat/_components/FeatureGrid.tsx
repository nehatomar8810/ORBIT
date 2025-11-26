import { Feature } from "./empty-chat-state.types";

interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

export function FeatureGrid({ features, className = "" }: FeatureGridProps) {
  return (
    <div className={`grid lg:grid-cols-3 gap-8 mb-20 w-full max-w-6xl z-10 relative ${className}`}>
      {features.map((feature, index) => (
        <div key={feature.id} className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-3xl"></div>
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgAccent} opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl`}></div>
          <div className={`relative p-8 border border-slate-700/50 rounded-3xl backdrop-blur-xl transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl ${feature.borderHover}`}>
            <div className={`bg-gradient-to-br ${feature.gradient} p-1 rounded-2xl inline-block mb-6 shadow-lg`}>
              <div className="bg-slate-900 p-4 rounded-2xl">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-white font-bold text-xl mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed font-light">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
