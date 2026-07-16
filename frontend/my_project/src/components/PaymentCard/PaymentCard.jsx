function PaymentCard() {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 w-96">

      <p className="text-gray-500">
        Available Balance
      </p>

      <h1 className="text-4xl font-bold mt-2">
        ₹1,25,480
      </h1>

      <div className="mt-8 flex justify-between">

        <div>
          <p className="text-gray-500">Income</p>
          <h2 className="text-green-600 font-bold">
            + ₹80,000
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Expense</p>
          <h2 className="text-red-600 font-bold">
            - ₹24,500
          </h2>
        </div>

      </div>

      <button className="mt-8 bg-purple-600 text-white w-full py-3 rounded-xl hover:bg-purple-700">
        Send Money
      </button>

    </div>
  );
}

export default PaymentCard;