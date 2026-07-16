import PaymentCard from "../PaymentCard/PaymentCard";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex items-center justify-between px-12">

      {/* Left Side */}
      <div className="max-w-xl">

        <p className="text-purple-600 font-semibold mb-3">
          🚀 Secure • Fast • AI Powered
        </p>

        <h1 className="text-6xl font-bold leading-tight">
          AI-Powered <br />
          <span className="text-purple-600">
            Payment Gateway
          </span>
        </h1>

        <p className="text-gray-600 mt-6 text-lg leading-8">
          Send, Receive and Manage your payments securely.
          Smart analytics, AI insights and instant transactions
          in one place.
        </p>

        <div className="mt-8 flex gap-5">

          <button className="bg-purple-600 text-white px-7 py-3 rounded-xl hover:bg-purple-700">
            Get Started
          </button>

          <button className="border border-purple-600 text-purple-600 px-7 py-3 rounded-xl hover:bg-purple-100">
            Live Demo
          </button>

        </div>

      </div>

      {/* Right Side */}

      <div>
        <PaymentCard
          src="https://placehold.co/500x500/png"
          alt="Hero"
          className="rounded-3xl shadow-xl"
        />
      </div>

    </section>
  );
}

export default Hero;