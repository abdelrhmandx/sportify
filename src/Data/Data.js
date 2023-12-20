// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { GiWhistle,GiChampions  } from "react-icons/gi";
import { RiReservedLine } from "react-icons/ri";
import { PiSwapFill } from "react-icons/pi";
import { FaUsers  } from "react-icons/fa";
import { GoHomeFill  } from "react-icons/go";
import { TbSoccerField } from "react-icons/tb";

import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import event from '../imgs/cards/event.png';
import reserved from '../imgs/cards/reserved.png';
import train from '../imgs/cards/train.png';

// Sidebar Data
export const SidebarData = [
  {
    icon: GoHomeFill ,
    heading: "Dashboard",
    path:'/dashboard'
  },
  
  {
    icon: FaUsers ,
    heading: "Users",
    path:'/dashboard/users'
  },
  {
    icon: GiWhistle,
    heading: "Trainer",
    path: "/dashboard/trainners"
  },
  {
    icon: GiChampions,
    heading: 'Events',
    path: "/dashboard/events"
  },
  {
    icon: TbSoccerField ,
    heading: 'Play Grounds',
    path : "/dashboard/playground"
  },

  {
    icon: PiSwapFill,
    heading: 'Swap',
    path:'/dashboard/swap'
  },
  
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Trainer",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
  
    png: GiWhistle,
    series: [
      {

      },
    ],
  },
  {
    title: "Events",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: GiChampions,
    series: [
      {
     
      },
    ],
  },
  {
    title: "reservation",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: RiReservedLine,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "swap",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: PiSwapFill,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Playground",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: TbSoccerField ,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];