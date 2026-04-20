import { formatDate } from "../../core/utils/helpers";

function OrderHeader({ priority, status, id, deliveryIn, estimatedDelivery }) {
  const isArriving = deliveryIn >= 0;

  return (
    <div className="flex flex-col">
      {/* 1. Header Metadata */}
      <div className="flex items-center justify-between p-6 bg-white">
        <div>
          <h2 className="text-xl font-black text-stone-800 tracking-tight">
            Order #{id}
          </h2>
          <div className="flex items-center gap-2 mt-1.5">
            {priority && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-md text-[10px] font-black uppercase tracking-wider">
                Priority
              </span>
            )}
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                !isArriving
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            Current Status
          </span>
          <span
            className={`text-sm font-black uppercase ${
              !isArriving ? "text-emerald-600" : "text-amber-600"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* 2. Prominent Status Section (Thematic Shift) */}
      <div
        className={`mx-6 mb-6 p-6 rounded-2xl border transition-all duration-500 ${
          isArriving
            ? "bg-yellow-400 border-yellow-500 shadow-md shadow-yellow-100"
            : "bg-stone-50 border-stone-200"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-inner ${
                isArriving ? "bg-yellow-500" : "bg-white border border-stone-200"
              }`}
            >
              {isArriving ? "🚚" : "🍕"}
            </div>
            <div>
              <h3
                className={`text-xl font-black leading-tight ${
                  isArriving ? "text-stone-900" : "text-stone-800"
                }`}
              >
                {isArriving ? "Arriving soon!" : "Enjoy your pizza!"}
              </h3>
              <p
                className={`text-sm font-medium mt-0.5 ${
                  isArriving ? "text-stone-800/70" : "text-stone-500"
                }`}
              >
                {isArriving
                  ? `Expected by ${formatDate(estimatedDelivery)}`
                  : `Delivered on ${formatDate(estimatedDelivery)}`}
              </p>
            </div>
          </div>

          {isArriving ? (
            <div className="bg-stone-900 text-white px-8 py-4 rounded-2xl shadow-lg transform -rotate-1 md:rotate-2">
              <span className="text-stone-400 text-[10px] uppercase font-black tracking-widest block mb-1">
                Est. Wait
              </span>
              <span className="text-3xl font-black text-yellow-400 leading-none">
                {deliveryIn}
                <span className="text-sm ml-1 uppercase">min</span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-stone-200 shadow-sm">
              <span className="text-emerald-500 text-xl font-bold">✓</span>
              <span className="text-stone-700 font-bold uppercase text-xs tracking-widest">
                Delivered Successfully
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
