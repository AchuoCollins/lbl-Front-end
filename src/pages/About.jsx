import React from "react";
import { Award, Users, Globe, Trophy, Shield, MapPin } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, label: "Founding Clubs", value: "7" },
    { icon: MapPin, label: "Cities", value: "7" },
    { icon: Trophy, label: "Season", value: "Inaugural" },
    { icon: Globe, label: "Region", value: "Littoral" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Community First",
      description: "Built for fans, players, and communities across the Littoral region."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Providing a structured, professional platform for basketball talent."
    },
    {
      icon: Globe,
      title: "Growth",
      description: "Starting with 7 clubs with plans to expand across Cameroon."
    }
  ];

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">ABOUT THE LBL</h1>
      <p className="text-lbl-soft text-sm mb-8 max-w-2xl">
        The Littoral Basketball League is building the future of basketball in Cameroon's most vibrant region.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-lbl-soft/10 p-6 text-center shadow-sm">
            <stat.icon size={24} className="text-lbl-orange mx-auto mb-2" />
            <p className="font-bebas text-3xl text-lbl-dark">{stat.value}</p>
            <p className="text-xs text-lbl-soft-light">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl border border-lbl-soft/10 p-8 shadow-sm mb-10">
        <h2 className="font-bebas text-2xl tracking-wide text-lbl-orange mb-3">OUR MISSION</h2>
        <p className="text-lbl-soft leading-relaxed max-w-3xl">
          To establish a sustainable, well-run basketball league that develops talent, 
          engages communities, and showcases the passion for basketball in the Littoral 
          region of Cameroon. We're committed to transparency, local coverage, and 
          creating opportunities for players and fans alike.
        </p>
      </div>

      {/* Values */}
      <h2 className="font-bebas text-2xl tracking-wide mb-4">CORE VALUES</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {values.map((value) => (
          <div key={value.title} className="bg-white rounded-2xl border border-lbl-soft/10 p-6 shadow-sm hover:border-lbl-orange/30 transition-colors">
            <value.icon size={24} className="text-lbl-orange mb-3" />
            <h3 className="font-bebas text-xl tracking-wide mb-2">{value.title}</h3>
            <p className="text-sm text-lbl-soft-light">{value.description}</p>
          </div>
        ))}
      </div>

      {/* History */}
      <div className="bg-gradient-to-br from-[#fcf5ec] to-[#f5efe8] dark:from-[#1A2124] dark:to-[#12181A] rounded-2xl border border-lbl-orange/20 p-8">
        <h2 className="font-bebas text-2xl tracking-wide text-lbl-orange mb-3">BUILDING TOWARD TIP-OFF</h2>
        <p className="text-lbl-soft leading-relaxed max-w-3xl">
          The Littoral Basketball League is currently in its pre-launch phase, 
          working with founding clubs to secure venues, establish operations, 
          and prepare for an exciting inaugural season. Follow our journey as 
          we build Cameroon's newest basketball league from the ground up.
        </p>
      </div>
    </div>
  );
}