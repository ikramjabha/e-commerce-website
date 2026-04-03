export default function ArrivalInfos() {
  const features = [
    {
      title: "جودة استثنائية",
      description: "ننتقي منتجاتنا بعناية فائقة لنضمن لك أعلى معايير الجودة العالمية.",
    },
    {
      title: "شحن سريع وآمن",
      description: "توصيل سريع لباب منزلك مع تغليف فاخر يحمي منتجاتك.",
    },
    {
      title: "دعم فني متواصل",
      description: "فريقنا متواجد دائماً للرد على استفساراتكم وضمان رضاكم التام.",
    }
  ];

  return (
    <section id="arrival" className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900">تميز في كل التفاصيل</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-12 rounded-[2rem] border border-zinc-100 flex flex-col items-start transition-shadow hover:shadow-xl hover:shadow-black/5">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 mb-8 font-bold text-xl">
                {index + 1}
              </div>
              <h4 className="text-xl font-bold text-zinc-900 mb-4">{feature.title}</h4>
              <p className="text-zinc-500 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
