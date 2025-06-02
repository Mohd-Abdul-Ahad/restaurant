import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredDish, setFeaturedDish] = useState(null);

  // Function to get random food image from Unsplash
  const getRandomFoodImage = () => {
    const foodKeywords = [
      "gourmet",
      "fine+dining",
      "restaurant+food",
      "luxury+food",
      "chef+special",
      "plated+dish",
      "michelin+star",
      "truffle",
      "wagyu",
      "lobster",
      "risotto",
      "foie+gras",
      "souffle",
      "cocktail",
      "dessert",
      "pasta",
      "steak"
    ];
    const randomKeyword = foodKeywords[Math.floor(Math.random() * foodKeywords.length)];
    return `https://source.unsplash.com/random/600x600/?${randomKeyword}`;
  };

  // Fallback demo dishes data with Unsplash images
  const demoDishes = [
    {
      _id: "1",
      dishname: "Truffle Infused Risotto",
      description:
        "Creamy Arborio rice with white truffle oil and wild mushrooms, finished with aged parmesan",
      price: "2200",
      category: "Signature",
      image: getRandomFoodImage(),
    },
    {
      _id: "2",
      dishname: "Wagyu Beef Carpaccio",
      description:
        "Paper-thin A5 Wagyu slices with truffle aioli, micro greens, and edible gold leaf",
      price: "3800",
      category: "Starter",
      image: getRandomFoodImage(),
    },
    {
      _id: "3",
      dishname: "Lobster Thermidor",
      description:
        "Maine lobster baked with cognac cream sauce, gruyère cheese, and herb crust",
      price: "4500",
      category: "Main menu",
      image: getRandomFoodImage(),
    },
    {
      _id: "4",
      dishname: "Saffron Infused Pasta",
      description:
        "Handmade pasta with Iranian saffron, king crab, and champagne cream sauce",
      price: "3200",
      category: "Main menu",
      image: getRandomFoodImage(),
    },
    {
      _id: "5",
      dishname: "Foie Gras Torchon",
      description:
        "House-cured duck liver with brioche toast, fig compote, and port wine reduction",
      price: "2800",
      category: "Starter",
      image: getRandomFoodImage(),
    },
    {
      _id: "6",
      dishname: "Chocolate Soufflé",
      description:
        "Warm Valrhona chocolate soufflé with vanilla bean ice cream and gold dust",
      price: "1800",
      category: "Dessert",
      image: getRandomFoodImage(),
    },
    {
      _id: "7",
      dishname: "Signature Cocktail",
      description:
        "Premium spirits with house-made ingredients and edible flowers",
      price: "1500",
      category: "Drinks",
      image: getRandomFoodImage(),
    },
  ];

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items");
        const data = await res.json();
        // Use your API data if available, otherwise use demo data
        const dishesToUse = data.length > 0 ? data : demoDishes;
        setDishes(dishesToUse);
        setFeaturedDish(
          dishesToUse[Math.floor(Math.random() * dishesToUse.length)]
        );
      } catch (error) {
        console.error("Error fetching dishes:", error);
        // Fallback to demo data
        setDishes(demoDishes);
        setFeaturedDish(
          demoDishes[Math.floor(Math.random() * demoDishes.length)]
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchDishes();
  }, []);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-30 bg-black bg-opacity-80 backdrop-blur-md py-4 px-4 md:px-8 flex justify-between items-center">
        <div className="text-2xl font-serif text-amber-400 tracking-widest">
          ÉCLAT
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          <a
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Menu
          </a>
          <a
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Gallery
          </a>
          <a
            href="#"
            className="text-white hover:text-amber-400 transition-colors"
          >
            Contact
          </a>
        </div>
        <Link
          to="/tablereservation"
          className="hidden md:block border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-4 lg:px-6 py-2 transition-colors duration-300 whitespace-nowrap"
        >
          Reservations
        </Link>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md z-20 md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <a
              href="#"
              className="text-white hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-white hover:text-amber-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/tablereservation"
              className="border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-6 py-2 transition-colors duration-300 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reservations
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-restaurant-tasting-menu-close-up-19703-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
          <div className="mb-4 md:mb-8">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 mx-auto text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-4 md:mb-6 tracking-wider">
            ÉCLAT
          </h1>
          <div className="w-24 md:w-32 h-px bg-amber-400 my-4 md:my-6 mx-auto"></div>
          <p className="text-lg md:text-xl text-white max-w-md md:max-w-2xl mb-6 md:mb-8 font-light">
            Michelin-starred dining experience where artistry meets gastronomy
          </p>
          <Link
            to="/tablereservation"
            className="bg-transparent border-2 border-amber-400 hover:bg-amber-400 text-white hover:text-black px-6 py-2 md:px-10 md:py-3 rounded-none font-medium transition-all duration-300 uppercase tracking-wider text-xs md:text-sm"
          >
            Secure Your Table
          </Link>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
          <svg
            className="animate-bounce w-6 h-6 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Featured Dish */}
      {featuredDish && (
        <div className="py-16 md:py-24 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-amber-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4 tracking-wider">
                Chef's Creation
              </h2>
              <div className="flex justify-center items-center">
                <div className="w-12 md:w-16 h-px bg-amber-400"></div>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <div className="w-12 md:w-16 h-px bg-amber-400"></div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-16">
              <div className="lg:w-1/2">
                <div className="relative overflow-hidden rounded-none h-64 sm:h-80 md:h-[500px] shadow-xl md:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 z-10"></div>
                  <img
                    src={featuredDish.image}
                    alt={featuredDish.dishname}
                    className="w-full h-full object-cover transform hover:scale-105 transition duration-1000"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
                    <span className="text-xs tracking-widest text-white uppercase">
                      Seasonal Special
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-white mt-1 md:mt-2">
                      {featuredDish.dishname}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center mt-6 lg:mt-0">
                <div className="mb-6 md:mb-8">
                  <span className="text-xs md:text-sm tracking-widest text-amber-600 uppercase">
                    Featured Dish
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-gray-900 mt-1 md:mt-2 mb-4 md:mb-6">
                    {featuredDish.dishname}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                    {featuredDish.description}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-b border-gray-200 py-4 md:py-6 gap-4 sm:gap-0">
                    <div>
                      <span className="text-xs md:text-sm text-gray-500">Price</span>
                      <p className="text-xl md:text-2xl font-serif text-gray-900">
                        ₹{featuredDish.price}
                      </p>
                    </div>
                    <button className="bg-black hover:bg-amber-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-none font-medium uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
                      Add to Tasting Menu
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Chef preparing dish"
                      className="w-full h-24 md:h-32 object-cover"
                    />
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Ingredients"
                      className="w-full h-24 md:h-32 object-cover"
                    />
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Plated dish"
                      className="w-full h-24 md:h-32 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="py-16 md:py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4 tracking-wider">
              Our Degustation
            </h2>
            <div className="flex justify-center items-center">
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
            </div>
            <p className="text-gray-600 max-w-md md:max-w-2xl mx-auto mt-4 md:mt-6 text-sm md:text-base">
              An ever-evolving menu celebrating the finest seasonal ingredients
              from around the world
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
          ) : (
            <>
              {/* Starters Section */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-xl md:text-2xl font-serif font-light text-gray-900 mb-6 md:mb-8 border-b border-gray-200 pb-2 md:pb-4">
                  Starters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {dishes
                    .filter((d) => d.category === "Starter")
                    .map((dish) => (
                      <div key={dish._id} className="group">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={dish.image}
                              alt={dish.dishname}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg md:text-xl font-serif text-gray-900 group-hover:text-amber-600 transition-colors">
                                {dish.dishname}
                              </h4>
                              <span className="font-serif text-gray-900">
                                ₹{dish.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {dish.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-px bg-gray-100 mt-3 md:mt-4 group-hover:bg-amber-200 transition-colors"></div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Main Menu Section */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-xl md:text-2xl font-serif font-light text-gray-900 mb-6 md:mb-8 border-b border-gray-200 pb-2 md:pb-4">
                  Main Menu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {dishes
                    .filter((d) => d.category === "Main menu")
                    .map((dish) => (
                      <div key={dish._id} className="group">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={dish.image}
                              alt={dish.dishname}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg md:text-xl font-serif text-gray-900 group-hover:text-amber-600 transition-colors">
                                {dish.dishname}
                              </h4>
                              <span className="font-serif text-gray-900">
                                ₹{dish.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {dish.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-px bg-gray-100 mt-3 md:mt-4 group-hover:bg-amber-200 transition-colors"></div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Desserts Section */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-xl md:text-2xl font-serif font-light text-gray-900 mb-6 md:mb-8 border-b border-gray-200 pb-2 md:pb-4">
                  Desserts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {dishes
                    .filter((d) => d.category === "Dessert")
                    .map((dish) => (
                      <div key={dish._id} className="group">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={dish.image}
                              alt={dish.dishname}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg md:text-xl font-serif text-gray-900 group-hover:text-amber-600 transition-colors">
                                {dish.dishname}
                              </h4>
                              <span className="font-serif text-gray-900">
                                ₹{dish.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {dish.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-px bg-gray-100 mt-3 md:mt-4 group-hover:bg-amber-200 transition-colors"></div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Drinks Section */}
              <div className="mb-12 md:mb-16">
                <h3 className="text-xl md:text-2xl font-serif font-light text-gray-900 mb-6 md:mb-8 border-b border-gray-200 pb-2 md:pb-4">
                  Drinks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {dishes
                    .filter((d) => d.category === "Drinks")
                    .map((dish) => (
                      <div key={dish._id} className="group">
                        <div className="flex items-start gap-4 md:gap-6">
                          <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={dish.image}
                              alt={dish.dishname}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-lg md:text-xl font-serif text-gray-900 group-hover:text-amber-600 transition-colors">
                                {dish.dishname}
                              </h4>
                              <span className="font-serif text-gray-900">
                                ₹{dish.price}
                              </span>
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                              {dish.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-px bg-gray-100 mt-3 md:mt-4 group-hover:bg-amber-200 transition-colors"></div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          <div className="text-center mt-8 md:mt-16">
            <button className="border border-black hover:bg-black hover:text-white px-6 py-2 md:px-10 md:py-3 rounded-none font-medium uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
              View Full Menu
            </button>
          </div>
        </div>
      </div>

      {/* Chef's Table Section */}
      <div className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Chef's table"
                className="w-full h-64 sm:h-80 md:h-[500px] object-cover"
              />
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <span className="text-xs md:text-sm tracking-widest text-amber-400 uppercase">
                Exclusive Experience
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-light mt-2 mb-4 md:mb-6 tracking-wider">
                The Chef's Table
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                An intimate culinary journey with our executive chef, featuring
                bespoke creations paired with rare vintages from our cellar.
              </p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-amber-400 mr-2 md:mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">10-course tasting menu</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-amber-400 mr-2 md:mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">
                    Wine pairing with rare vintages
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-amber-400 mr-2 md:mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm md:text-base">
                    Limited to 6 guests per evening
                  </span>
                </li>
              </ul>
              <button className="bg-transparent border-2 border-amber-400 hover:bg-amber-400 text-white hover:text-black px-6 py-2 md:px-8 md:py-3 rounded-none font-medium uppercase tracking-wider text-xs md:text-sm transition-colors duration-300">
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4 tracking-wider">
              Gallery
            </h2>
            <div className="flex justify-center items-center">
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="col-span-2 row-span-2">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Restaurant interior"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
                alt="Dish presentation"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80"
                alt="Wine selection"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                alt="Chef preparing food"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                alt="Dessert"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 md:py-24 bg-amber-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4 tracking-wider">
              Testimonials
            </h2>
            <div className="flex justify-center items-center">
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
              <svg
                className="w-5 h-5 md:w-6 md:h-6 mx-3 md:mx-4 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="w-12 md:w-16 h-px bg-amber-400"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 shadow-md md:shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 md:mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                    alt="Sarah Johnson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base md:text-lg">Sarah Johnson</h4>
                  <span className="text-xs md:text-sm text-gray-500">Food Critic</span>
                </div>
              </div>
              <p className="text-gray-600 italic text-sm md:text-base">
                "The tasting menu at Éclat was nothing short of spectacular.
                Each course was a masterpiece, with flavors that evolved
                beautifully. The wine pairings were inspired and the service
                impeccable."
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 shadow-md md:shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 md:mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                    alt="Michael Chen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base md:text-lg">Michael Chen</h4>
                  <span className="text-xs md:text-sm text-gray-500">Regular Guest</span>
                </div>
              </div>
              <p className="text-gray-600 italic text-sm md:text-base">
                "I've dined at Michelin-starred restaurants around the world,
                and Éclat stands among the very best. The attention to detail in
                every aspect of the experience is remarkable."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-serif text-amber-400 mb-4 md:mb-6">ÉCLAT</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                24, Luxury Avenue
                <br />
                Mumbai, India 400001
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                +91 22 1234 5678
                <br />
                reservations@eclat.com
              </p>
            </div>
            <div>
              <h4 className="font-serif text-base md:text-lg mb-4 md:mb-6">Hours</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>Tuesday - Thursday: 6PM - 10PM</li>
                <li>Friday - Saturday: 6PM - 11PM</li>
                <li>Sunday: 6PM - 9PM</li>
                <li>Monday: Closed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-base md:text-lg mb-4 md:mb-6">Follow Us</h4>
              <div className="flex space-x-3 md:space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-base md:text-lg mb-4 md:mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
                Subscribe for exclusive events and seasonal menus
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white px-3 py-2 md:px-4 md:py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm md:text-base"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 transition-colors text-sm md:text-base whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} Éclat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;