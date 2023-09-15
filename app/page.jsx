"use client";

/* This example requires Tailwind CSS v3.0+ */
import { useState, useCallback, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import {
  Bars3Icon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

import {
  ShieldCheckIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import {
  FaFan,
  FaKitchenSet,
  FaBath,
  FaMotorcycle,
  FaShirt,
  FaShower,
  FaWhatsapp,
  FaInstagram,
  FaMapPin,
} from "react-icons/fa6";

import { BiSolidCctv } from "react-icons/bi";

import { MdFastfood } from "react-icons/md";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.155802607192585,
  lng: 106.81657045161967,
};

const navigation = [
  { name: "Home", href: "#" },
  { name: "Kamar", href: "#kamar" },
  { name: "Fasilitas", href: "#fasilitas" },
  { name: "Galeri", href: "#galeri" },
  { name: "Kontak", href: "#kontak" },
];

const tiers = [
  {
    id: "tier-hobby",
    name: "Non-AC",
    href: "#",
    priceMonthly: "1 jt",
    description:
      "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
    features: [
      "Free Wifi / LAN Port",
      "Jendela",
      "Kipas",
      "Kamar Mandi Luar",
      "Water Heater",
    ],
  },
  {
    id: "tier-team",
    name: "AC",
    href: "#",
    priceMonthly: "2 jt",
    description:
      "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
    features: [
      "Free Wifi / LAN Port",
      "Full AC",
      "Kamar Mandi Dalam",
      "Lemari",
      "Kunci Elektronik",
      "Wastafel",
      "Meja + Kursi",
      "Water Heater",
    ],
  },
];

const features = [
  {
    name: "Free WIFI / LAN Port ",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: WifiIcon,
  },
  {
    name: "Kamar AC dan Non-AC",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: FaFan,
  },
  {
    name: "Dapur & Kompor Masak",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: FaKitchenSet,
  },
  {
    name: "Kamar Mandi Luar / Dalam",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FaBath,
  },
  {
    name: "Ruang Santai / Merokok",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: MdFastfood,
  },
  {
    name: "Parkir Motor",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FaMotorcycle,
  },
  {
    name: "Jemuran",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FaShirt,
  },
  {
    name: "CCTV",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: BiSolidCctv,
  },
  {
    name: "Air Panas",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FaShower,
  },
];

const products = [
  {
    id: 1,
    name: "Focus Paper Refill",
    href: "#",
    price: "Kamar",
    description: "3 sizes available",
    imageSrc:
      "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Focus Card Holder",
    href: "#",
    price: "Toilet",
    description: "Walnut",
    imageSrc:
      "https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Focus Carry Case",
    href: "#",
    price: "Dapur",
    description: "Heather Gray",
    imageSrc:
      "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },

  // More products...
];

const navigation2 = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg viewBox="0 0 24 24" {...props}>
          <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"></path>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDfWiey-TD-e3ttmNPZiba4t4WEm9-BN-M",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    map.setCenter(center);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <img
          src="/bg-3.png"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".2"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs></defs>
          </svg>
        </div>
        <div className="px-6 lg:px-8">
          <nav
            className="flex items-center justify-between pt-6"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-14" src="./logo.png" alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel
              focus="true"
              className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                KOST HIBIKI
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Tempat Aman, Nyaman, dan Strategis di Jakarta Barat. Temukan
                kenyamanan tinggal di lokasi strategis, fasilitas umum, dan
                transportasi umum.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href={"https://wa.me/6285158024415"}
                  className="rounded-md  px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                  style={{ backgroundColor: "#48A0E4" }}
                >
                  Booking Sekarang
                </a>
                <a
                  href="#fasilitas"
                  className="text-base font-semibold leading-7 text-white"
                >
                  Selengkapnya <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".2"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs></defs>
          </svg>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32" id="fasilitas">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              className="text-lg font-semibold leading-8 tracking-tight text-indigo-600"
              style={{ color: "#48A0E4" }}
            >
              Fasilitas
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fasilitas Lengkap
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nikmati Kemudahan dan Kenyamanan dengan Fasilitas Modern Kami.
              Pengalaman Menginap di KOST HIBIKI Dirancang untuk Kenyamanan dan
              Kemudahan Anda.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div
                      className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg "
                      style={{ backgroundColor: "#48A0E4" }}
                    >
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-gray-900" id="kamar">
        <div className="relative overflow-hidden pt-32 pb-96 lg:pt-40">
          <div>
            <img
              className="absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2"
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
              alt=""
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h2
                className="text-lg font-semibold leading-8 text-indigo-400"
                style={{ color: "#48A0E4" }}
              >
                Harga
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                Harga terbaik <br className="hidden sm:inline lg:hidden" />
                dan terjangkau
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Harga yang Ramah di Kantong untuk Menginap Nyaman di KOST
                HIBIKI. Dompet Anda Akan Berterima Kasih.
              </p>
            </div>
          </div>
        </div>
        <div className="flow-root bg-white pb-32 lg:pb-40">
          <div className="relative -mt-80">
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 lg:gap-8">
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10"
                  >
                    <div className="p-8 sm:p-10">
                      <h3
                        className="text-lg font-semibold leading-8 tracking-tight "
                        style={{ color: "#48A0E4" }}
                        id={tier.id}
                      >
                        {tier.name}
                      </h3>
                      <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-gray-900">
                        Rp {tier.priceMonthly}
                        <span className="text-lg font-semibold leading-8 tracking-normal text-gray-500">
                          /bulan
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-2">
                      <div className="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 p-6 sm:p-8">
                        <ul role="list" className="space-y-6">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 "
                                  style={{ color: "#48A0E4" }}
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-sm leading-6 text-gray-600">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <a
                            href={"https://wa.me/6285158024415"}
                            className="inline-block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-white shadow-md hover:bg-indigo-700"
                            aria-describedby={tier.id}
                            style={{ backgroundColor: "#48A0E4" }}
                          >
                            Booking Sekarang
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4 mt-24 border">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Aman & Nyaman
                  </dt>
                  <dd
                    className="order-1 text-center flex justify-center "
                    style={{ color: "#48A0E4" }}
                  >
                    <ShieldCheckIcon className="h-24"></ShieldCheckIcon>
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Akses Pintu 24 Jam
                  </dt>
                  <dd
                    className="order-1 text-center flex justify-center"
                    style={{ color: "#48A0E4" }}
                  >
                    <ClockIcon className="h-24"></ClockIcon>
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Fasilitas Lengkap
                  </dt>
                  <dd
                    className="order-1 text-center flex justify-center"
                    style={{ color: "#48A0E4" }}
                  >
                    <ClipboardDocumentCheckIcon className="h-24"></ClipboardDocumentCheckIcon>
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Lokasi Strategis
                  </dt>
                  <dd
                    className="order-1 text-center flex justify-center"
                    style={{ color: "#48A0E4" }}
                  >
                    <MapPinIcon className="h-24"></MapPinIcon>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden bg-gray-50 py-12 md:py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <svg
            className="absolute top-full right-full translate-x-1/3 -translate-y-1/4 transform lg:translate-x-1/2 xl:-translate-y-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            role="img"
            aria-labelledby="svg-workcation"
          >
            <title id="svg-workcation">Workcation</title>
            <defs>
              <pattern
                id="ad119f34-7694-4c31-947f-5c9d249b21f3"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
            />
          </svg>

          <div className="relative">
            {/* <img
              className="mx-auto h-8"
              src="https://tailwindui.com/img/logos/workcation-logo-indigo-600-mark-gray-800-and-indigo-600-text.svg"
              alt="Workcation"
            /> */}
            <blockquote className="mt-10">
              <div className="mx-auto max-w-3xl text-center text-2xl font-medium leading-9 text-gray-900">
                <p>
                  &ldquo;Sangat bersih dan murah untuk kos AC di sekitarnya, 2
                  juta sendiri dan 2.1 juta untuk berdua. Admin dan penjaga kos
                  juga baik dan bisa berkomunikasi tanpa ada batasan waktu. Top
                  deh&rdquo;
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    {/* <img
                      className="mx-auto h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-medium text-gray-900">
                      Ristan Agustyani
                    </div>

                    {/* <svg
                      className="mx-1 hidden h-5 w-5 text-indigo-600 md:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg> */}

                    <div className="text-base font-medium text-gray-500">
                      {/* CEO, Workcation */}
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="bg-white" id="galeri">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              className="text-lg font-semibold leading-8 tracking-tight "
              style={{ color: "#48A0E4" }}
            >
              Gallery
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Galeri fasilitas kos Hibiki
            </p>
          </div>

          <div className="bg-white">
            <div
              className="mx-auto max-w-2xl py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8"
              style={{ height: "50vh" }}
            >
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {products.map((product) => (
                  <SwiperSlide>
                    <div key={product.id} className="h-full">
                      <div className="relative h-full">
                        <div className="relative w-full overflow-hidden rounded-lg h-full">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className=" w-full h-full object-contain object-center"
                          />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex  items-end justify-end overflow-hidden rounded-lg p-4 h-full">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-8 grid grid-cols-3 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white" id="kontak">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative mx-auto  lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-6 lg:col-span-2 lg:pr-8 lg:pl-28  lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Kontak
              </h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                Hubungi Kami untuk informasi lebih lanjut
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Alamat</dt>
                  <dd>
                    <p>
                      Jl. Keselamatan No.37, RT.7/RW.8, Krukut, Kec. Taman Sari,
                      Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11140
                    </p>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">No Telp</dt>
                  <dd className="flex">
                    <FaWhatsapp
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">+6285158024415</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Instagram</dt>
                  <dd className="flex">
                    <FaInstagram
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">kosthibiki</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Maps</dt>
                  <dd className="flex">
                    <FaMapPin
                      className="h-6 w-6 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Kos Hibiki Jakarta Barat</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white  lg:col-span-3 ">
            <div className="mx-auto w-full h-full lg:max-w-none">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={18}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* Child components, such as markers, info windows, etc. */}
                  <Marker
                    position={{
                      lat: -6.155802607192585,
                      lng: 106.81657045161967,
                    }}
                  />
                </GoogleMap>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl overflow-hidden py-16 px-6 sm:py-16 lg:px-8">
          <nav
            className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
            aria-label="Footer"
          >
            {navigation.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-sm leading-6 text-white">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            <a
              key={"whatsapp"}
              href={"https://wa.me/6285158024415"}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Whatsapp</span>
              <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
            </a>
            <a
              key={"instagram"}
              href={"https://www.instagram.com/kosthibiki/"}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Instagran</span>
              <FaInstagram className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Kos Hibiki. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
