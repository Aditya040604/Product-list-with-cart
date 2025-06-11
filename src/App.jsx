import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = screenWidth <= 768;
  function startNewOrder() {
    setCartItems([]);
    setOrderConfirmed(false);
  }
  function removeFromCart(product) {
    setCartItems((prev) =>
      prev.flatMap((item) =>
        item.name === product.name
          ? item.quantity > 1
            ? [
                {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: item.totalPrice - item.price,
                },
              ]
            : []
          : [item]
      )
    );
  }
  function discardItem(product) {
    setCartItems((prev) => prev.filter((item) => item.name !== product.name));
    console.log(cartItems);
  }
  function addToCart(product) {
    const existing = cartItems.find((item) => item.name === product.name);
    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: product.price * (item.quantity + 1),
              }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, quantity: 1, totalPrice: product.price },
      ]);
    }
  }

  return (
    <main className="flex flex-col my-10  sm:mx-14  lg:flex-row  min-h-screen">
      <section className="mx-6 sm:mx-10 py-8">
        <Header />
        <ProductsList
          onAddToCart={addToCart}
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          isMobile={isMobile}
        />
      </section>

      <ProductsCart
        cartItems={cartItems}
        onDiscardItem={discardItem}
        orderConfirmed={orderConfirmed}
        setOrderConfirmed={setOrderConfirmed}
        startNewOrder={startNewOrder}
      />
    </main>
  );
}

function Header() {
  return <h1 className="text-5xl font-extrabold">Desserts</h1>;
}

function ProductsList({ onAddToCart, cartItems, onRemoveFromCart, isMobile }) {
  return (
    <section className="w-full lg:max-w-[60vw] md:max-w-[90vw] grid-cols-1 md:grid-cols-3 grid sm:grid-cols-2 gap-6 mt-10  m-auto">
      {products.map((d) => (
        <Product
          productObj={d}
          handleAddToCart={onAddToCart}
          cartItems={cartItems}
          handleRemoveFromCart={onRemoveFromCart}
          key={d.name}
          isMobile={isMobile}
        />
      ))}
    </section>
  );
}

function Product({
  productObj,
  handleAddToCart,
  cartItems,
  handleRemoveFromCart,
  isMobile,
}) {
  const productInCart = cartItems.find((item) => item.name === productObj.name);
  return (
    <div className="">
      <div
        className={`rounded-xl overflow-hidden ${
          productInCart ? "border-[3px] border-amber-700" : ""
        }`}
      >
        <img
          className="w-full h-auto"
          src={isMobile ? productObj.image.mobile : productObj.image.desktop}
          alt={productObj.name}
          draggable="false"
        />
      </div>
      <Button
        handleAddToCart={handleAddToCart}
        productInCart={productInCart}
        productObj={productObj}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <p className="text-gray-500 mt-10">{productObj.category}</p>
      <p className="font-medium ">{productObj.name}</p>
      <p className="text-red-600 font-medium">${productObj.price.toFixed(2)}</p>
    </div>
  );
}

function Button({
  handleAddToCart,
  productObj,
  productInCart,
  handleRemoveFromCart,
}) {
  return (
    <>
      {productInCart ? (
        <div className="relative">
          <div className="bg-orange-700 w-[9rem] md:w-[9rem] lg:w-[10.5rem] text-white px-4 py-2 mx-auto border border-amber-900 flex items-center rounded-full justify-between absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2">
            <span
              className="text-lg w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border border-white hover:bg-white hover:text-orange-600 transition-colors"
              onClick={() => handleRemoveFromCart(productObj)}
            >
              –
            </span>

            <span className="text-sm">{productInCart.quantity}</span>

            <span
              className="text-lg w-6 h-6 flex items-center justify-center rounded-full cursor-pointer border border-white hover:bg-white hover:text-orange-600 transition-colors"
              onClick={() => handleAddToCart(productObj)}
            >
              +
            </span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            className="w-[9rem] md:w-[9rem] lg:w-[10.5rem] bg-amber-50 border-1 text-sm font-semibold border-amber-900 cursor-pointer px-4 py-2.5 rounded-4xl hover:bg-amber-100 transition-colors absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]"
            onClick={() => handleAddToCart(productObj)}
          >
            {" "}
            <img
              src="/assets/images/icon-add-to-cart.svg"
              alt="cart icon"
              className="inline-block align-middle "
              draggable="false"
            />
            <span className="align-middle pl-2">Add to Cart</span>
          </button>
        </div>
      )}
    </>
  );
}

function ProductsCart({
  cartItems,
  onDiscardItem,
  orderConfirmed,
  setOrderConfirmed,
  startNewOrder,
}) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (orderConfirmed) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [orderConfirmed]);
  const allItemsPrice = cartItems.reduce(
    (accum, item) => accum + item.totalPrice,
    0
  );

  return (
    <div className="flex-1 bg-white rounded-2xl px-8 py-8 h-fit max-h-[85vh] overflow-y-auto shadow-sm shadow-gray-300/50 pb-11">
      <h2 className="text-2xl text-amber-800 font-bold mb-2">
        Your Cart ({totalQuantity})
      </h2>
      {cartItems.length == 0 ? (
        <>
          <img
            className=" mx-auto"
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty cart icon"
            draggable="false"
          />

          <p className="text-amber-900 text-center">
            Your added items will appear
          </p>
        </>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              item={item}
              key={item.name}
              handleDiscardItem={onDiscardItem}
            />
          ))}
          <div className="flex justify-between my-10">
            <p>Order Total</p>
            <p className="text-3xl font-semibold">
              ${allItemsPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex justify-center gap-2 my-10">
            <img
              src="/assets/images/icon-carbon-neutral.svg"
              alt="carbon neutral icon"
              draggable="false"
            />
            <p className="text-amber-950 ">
              This is a <span className="font-medium">carbon neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            className="cursor-pointer w-full rounded-full bg-orange-700 text-white font-medium py-4"
            onClick={() => setOrderConfirmed(true)}
          >
            Confirm Order
          </button>
          <OrderConfirmedMessage
            orderConfirmed={orderConfirmed}
            cartItems={cartItems}
            allItemsPrice={allItemsPrice}
            startNewOrder={startNewOrder}
          />
        </>
      )}
    </div>
  );
}

function OrderConfirmedMessage({
  orderConfirmed,
  cartItems,
  allItemsPrice,
  startNewOrder,
}) {
  return (
    <>
      {orderConfirmed && (
        <div className="fixed inset-0 bg-black/45  flex items-center justify-center z-50">
          <div className="bg-white py-2 px-10 rounded-2xl shadow-lg max-w-xl w-full overflow-y-auto max-h-[80vh]">
            <img
              src="/assets/images/icon-order-confirmed.svg"
              alt="order confirmed logo"
              className="my-8 scale-[1.1]"
              draggable="false"
            />
            <h2 className="text-4xl font-semibold my-2 text-amber-950 ">
              Order Confirmed
            </h2>
            <p className="text-amber-950/70 ">We hope you enjoy your food!</p>
            <div className="bg-[#fdf5f1]/70 pr-7 rounded-md my-5 py-2">
              {cartItems.map((item) => (
                <OrderList item={item} key={item.name} />
              ))}
              <div className="flex items-center  justify-between ml-4 my-6 ">
                <p>Order Total</p>
                <p className="text-3xl font-semibold">
                  ${allItemsPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="w-full bg-orange-700 text-white rounded-full py-3 font-semibold mb-6"
              onClick={startNewOrder}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function OrderList({ item }) {
  return (
    <div className="flex justify-between border-b-2 border-gray-500/10">
      <div className="flex items-center">
        <img
          src={item.image.thumbnail}
          alt={item.name}
          className=" rounded-md scale-[0.6]"
          draggable="false"
        />
        <div className="font-medium text-amber-950">
          <p>{item.name}</p>
          <p>
            <span className="text-amber-700 mr-2.5">{item.quantity}x</span>{" "}
            <span className="font-extralight text-amber-900/70">
              @{item.price.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <p className="font-medium text-lg">${item.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

function CartItem({ item, handleDiscardItem }) {
  const itemsPrice = item.totalPrice.toFixed(2);
  return (
    <div className="flex justify-between border-b-1 border-gray-200 py-4">
      <div>
        <p className="font-medium mb-1.5">{item.name}</p>
        <span className="text-orange-800 font-[500]">{item.quantity}x</span>
        <span className="mx-3.5 text-gray-600">@{item.price.toFixed(2)}</span>
        <span>${itemsPrice}</span>
      </div>
      <img
        className="border-1 border-gray-500 h-fit rounded-full p-1 my-auto hover:border-2 hover:border-black hover:filter hover:brightness-0 cursor-pointer"
        src="/assets/images/icon-remove-item.svg"
        alt="remove icon"
        draggable="false"
        onClick={() => handleDiscardItem(item)}
      />
    </div>
  );
}

export default App;
