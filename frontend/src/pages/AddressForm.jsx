import {
  addAddress,
  deleteAddress,
  setSelectedAddress,
} from "@/redux/productSlice";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddressForm = () => {
  const dispatch = useDispatch();

  const { cart, address, selectedAddress } = useSelector(
    (store) => store.product,
  );

  const [showForm, setShowForm] = useState(address?.length === 0);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(addAddress(formData));

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });

    setShowForm(false);
  };

  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 500 ? 0 : 40;
  const tax = parseFloat((subTotal * 0.05).toFixed(2));
  const total = subTotal + shipping + tax;
  console.log("cart", cart);
console.log("subTotal", subTotal);
console.log("shipping", shipping);
console.log("tax", tax);
console.log("total", total);
//payment 
const handlePayment = async () => {
  try {
    console.log("Total being sent:", total);
    // 1. CREATE ORDER (backend)
    const res = await fetch(
      "http://localhost:8000/api/v1/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      }
    );

    const data = await res.json();
    const order = data.order;

    // 2. RAZORPAY OPTIONS
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ShopVerse",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        // 3. VERIFY PAYMENT (backend)
        const verifyRes = await fetch(
          "http://localhost:8000/api/v1/payment/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("Payment Successful 🎉");

          // 👉 OPTIONAL NEXT STEPS:
          // dispatch(clearCart())
          // navigate("/success")
        } else {
          alert("Payment Failed ❌");
        }
      },

      prefill: {
        name: selectedAddress?.fullName,
        email: selectedAddress?.email,
        contact: selectedAddress?.phone,
      },

      theme: {
        color: "#ec4899",
      },
    };

    // 4. OPEN PAYMENT POPUP
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("Payment Error:", error);
  }
};
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-[1.8fr_0.8fr] gap-6">
        {/* LEFT SECTION */}
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Delivery Address</h2>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 text-pink-600 font-medium text-sm"
              >
                <Plus size={16} />
                Add New
              </button>
            )}
          </div>

          {/* Saved Addresses */}
          {!showForm && address?.length > 0 && (
            <div className="space-y-3">
              {address.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white border rounded-lg p-4 transition ${
                    selectedAddress === index
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                      <input
                        type="radio"
                        checked={selectedAddress === index}
                        onChange={() => dispatch(setSelectedAddress(index))}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-sm">
                            {item.fullName}
                          </h3>

                          <span className="text-xs text-gray-500">
                            {item.phone}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">
                          {item.address}
                        </p>

                        <p className="text-sm text-gray-600">
                          {item.city}, {item.state} - {item.zipCode}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.email}
                        </p>

                        <button
                          onClick={() => dispatch(setSelectedAddress(index))}
                          className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Deliver Here
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(deleteAddress(index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Form */}
          {showForm && (
            <form
              onSubmit={handleSave}
              className="bg-white border rounded-lg p-5 space-y-4"
            >
              <h3 className="font-medium text-base">Add New Address</h3>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border rounded-md px-3 py-2 text-sm w-full"
                required
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Street Address"
                className="border rounded-md px-3 py-2 text-sm w-full"
                required
              />

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border rounded-md px-3 py-2 text-sm"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-5 py-2 rounded-md text-sm"
                >
                  Save Address
                </button>

                {address?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="border px-5 py-2 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <div className="bg-white border rounded-lg p-5 sticky top-24">
            <h3 className="font-semibold text-base mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

           <button
  onClick={handlePayment}
  disabled={selectedAddress === null}
  className={`w-full mt-5 py-3 rounded-md font-medium text-sm ${
    selectedAddress !== null
      ? "bg-pink-600 text-white hover:bg-pink-700"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`}
>
  Place Order
</button>
            <div className="mt-5 pt-5 border-t">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Why shop with us?
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-green-600">✓</div>

                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>

                    <p className="text-xs text-gray-500">
                      On orders above ₹500
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-blue-600">↺</div>

                  <div>
                    <p className="text-sm font-medium">7 Days Easy Returns</p>

                    <p className="text-xs text-gray-500">
                      Hassle-free replacement and returns
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-purple-600">🔒</div>

                  <div>
                    <p className="text-sm font-medium">Secure Payments</p>

                    <p className="text-xs text-gray-500">
                      100% secure payment processing
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-orange-600">⚡</div>

                  <div>
                    <p className="text-sm font-medium">Fast Delivery</p>

                    <p className="text-xs text-gray-500">
                      Delivered within 3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {selectedAddress === null && (
              <p className="text-xs text-center text-gray-500 mt-2">
                Select an address to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
