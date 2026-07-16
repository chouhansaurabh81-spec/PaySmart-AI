function Features() {
  const features = [
    {
      title: "Secure Payments",
      description: "Your transactions are protected with advanced security."
    },
    {
      title: "AI Analytics",
      description: "Track your spending and receive smart AI insights."
    },
    {
      title: "Fast Transfers",
      description: "Transfer money instantly anytime and anywhere."
    }
  ];

  return (
    <section className="py-20 px-10 bg-gray-50">

      <h2 className="text-4xl font-bold text-center">
        Why Choose PaySmart AI?
      </h2>

      <p className="text-center text-gray-500 mt-4">
        Smart, Secure and AI Powered Payment Platform
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        {features.map((feature, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
          >

            <h3 className="text-2xl font-bold text-purple-600">
              {feature.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {feature.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;