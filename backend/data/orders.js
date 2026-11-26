const orders = [
  {
    orderItems: [
      {
        name: "Thin Crust Pizza",
        qty: "3",
        image: "images/thinCrustPizza.jpeg",
        price: "299",
        product: "64aba651cc2b7e38b369604b"
      }
    ],
    shippingAddress: {
      address: "abc building",
      city: "pune",
      pincode: "411234",
      state: "Maharashtra"
    },
    paymentMethod: "Cash",
    paymentResult: {
      id: "12345",
      status: "Success",
      updateTime: "11-07-2023",
      emailAddress: "abc@gmail.com"
    },
    taxPrice: 352.82,
    shippingPrice: 100,
    totalPrice: 452.82,
    isPaid: "false",
    paidAt: "",
    isDelivered: "false",
    deliveredAt: ""
},
]

export default orders;