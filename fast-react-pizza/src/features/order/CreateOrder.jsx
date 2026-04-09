import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../core/services/apiRestaurant";
import InputTxt from "../../core/ui/Input";
import Button from "../../core/ui/Button";
import { useSelector } from "react-redux";
import store from "../../core/store";
import { clearCart } from "../../features/cart/cartSlice";

// import { useSelector } from "react-redux";

const isValidePhone = (str) => {
  if (!str && str !== 0) return false;
  const s = String(str).trim();
  const phoneRegex =
    /^(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?\d{1,4}(?:[-.\s]?\d{1,4}){1,3}(?:\s*(?:ext|x|extension)\.?\s*\d{1,5})?$/i;
  return phoneRegex.test(s);
};

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "pizza 12",
//     quantity: 3,
//     unitPrice: 10,
//     totalPrice: 20,
//   },
//   {
//     pizzaId: 15,
//     name: "pizza 15",
//     quantity: 3,
//     unitPrice: 10,
//     totalPrice: 20,
//   },
//   {
//     pizzaId: 17,
//     name: "pizza 17",
//     quantity: 3,
//     unitPrice: 10,
//     totalPrice: 20,
//   },
// ];

function CreateOrder() {
  const cart = useSelector((state) => state.cart.items);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Ready to order?
          </h1>
          <p className="text-stone-500 text-lg">
            Fill in your details and we'll process your order right away!
          </p>
        </div>

        <Form method="POST" className="space-y-6">
          {/* Customer Name */}
          <div className="space-y-2">
            <label
              htmlFor="customer"
              className="block text-sm font-semibold text-stone-700"
            >
              Full Name
            </label>
            <InputTxt
              id="customer"
              placeholder="John Doe"
              customeStyles="bg-stone-50 border-2 border-stone-200 focus:border-yellow-500"
              name="customer"
              isRequired={true}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-stone-700"
            >
              Phone Number
            </label>
            <InputTxt
              id="phone"
              type="tel"
              name="phone"
              isRequired={true}
              customeStyles="bg-stone-50 border-2 border-stone-200 focus:border-yellow-500"
              placeholder="+1 (555) 123-4567"
            />
            {formError?.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {formError.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-stone-700"
            >
              Delivery Address
            </label>
            <InputTxt
              id="address"
              type="text"
              name="address"
              required
              customeStyles="bg-stone-50 border-2 border-stone-200 focus:border-yellow-500"
              placeholder="123 Main St, Apt 4B, City, State 12345"
            />
          </div>

          {/* Priority Checkbox */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-center gap-3">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500 cursor-pointer"
            />
            <label
              htmlFor="priority"
              className="text-stone-700 font-medium cursor-pointer select-none flex-1"
            >
              🚀 <strong>Priority Delivery</strong> - Get your order faster!
            </label>
          </div>

          {/* Hidden cart data */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* Submit Button */}
          <div className="pt-4">
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Placing your order...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🍕 Place Order Now
                </span>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidePhone(order.phone))
    errors.phone =
      "please give us your correct phone number, we might need to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  console.log("CreateOrder action received:", order);

  await store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
