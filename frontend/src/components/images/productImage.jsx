import React from "react";

import img1 from "./productImages/laptop.jpg"; 
import img2 from "./productImages/smartphone.jpg";
import img3 from "./productImages/headphone.jpg";
import img4 from "./productImages/smartwatch.jpg";
import img5 from "./productImages/console.jpg";
import img6 from "./productImages/maleclothes.jpg"; // Fashion
import img7 from "./productImages/femaleclothes.jpg";
import img8 from "./productImages/shoe.jpg";
import img9 from "./productImages/bag.jpg";
import img10 from "./productImages/bicycle.jpg"; // Outdoor
import img11 from "./productImages/gym.jpg";
import img12 from "./productImages/camping.jpg";
import img13 from "./productImages/coffee.jpg"; // Food
import img14 from "./productImages/coke.jpg";
import img15 from "./productImages/cheese.jpg";
import img16 from "./productImages/pasta.jpg";
import img17 from "./productImages/vegetables.jpg";
import img18 from "./productImages/fruits.jpg";
import img19 from "./productImages/bread.jpg";
import img20 from "./productImages/furniture.jpg"; // Furniture
import img21 from "./productImages/walldecor.jpg";
import img22 from "./productImages/kitchen.jpg";
import img23 from "./productImages/makeup.jpg"; // Hygiene
import img24 from "./productImages/perfume.jpg";

const ProductImage = ({ subcategory }) => {
  let productImage;

  switch (subcategory) {
    // Electronics
    case "laptop":
      productImage = img1;
      break;
    case "cellphone":
      productImage = img2;
      break;
    case "headphone":
      productImage = img3;
      break;
    case "smartwatch":
      productImage = img4;
      break;
    case "console":
      productImage = img5;
      break;

    // Fashion
    case "maleclothes":
      productImage = img6;
      break;
    case "femaleclothes":
      productImage = img7;
      break;
    case "shoe":
      productImage = img8;
      break;
    case "bag":
      productImage = img9;
      break;

    // Outdoor
    case "bicycle":
      productImage = img10;
      break;
    case "gym":
      productImage = img11;
      break;
    case "camping":
      productImage = img12;
      break;

    // Food
    case "coffee":
      productImage = img13;
      break;
    case "coke":
      productImage = img14;
      break;
    case "cheese":
      productImage = img15;
      break;
    case "pasta":
      productImage = img16;
      break;
    case "vegetables":
      productImage = img17;
      break;
    case "fruits":
      productImage = img18;
      break;
    case "bread":
      productImage = img19;
      break;

    // Furniture
    case "furniture":
      productImage = img20;
      break;
    case "walldecor":
      productImage = img21;
      break;
    case "kitchen":
      productImage = img22;
      break;

    // Hygiene
    case "makeup":
      productImage = img23;
      break;
    case "perfume":
      productImage = img24;
      break;

    // Default image if no match
    default:
      productImage = img1;
  }

  return (
    <img
      src={productImage}
      alt={subcategory}
      className="w-full h-full object-cover flex justify-center items-center"
    />
  );
};

export default ProductImage;
