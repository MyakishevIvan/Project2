export function randomString(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

const productNames = [
    "Blue Top",
    "Men Tshirt",
    "Sleeveless Dress",
    "Stylish Dress",
    "Winter Top",
    "Summer White Top",
    "Madame Top For Women",
    "Fancy Green Top",
    "Sleeves Printed Top - White",
    "Half Sleeves Top Schiffli Detailing - Pink",
    "Frozen Tops For Kids",
    "Full Sleeves Top Cherry - Pink",
    "Printed Off Shoulder Top - White",
    "Sleeves Top and Short - Blue & Pink",
    "Little Girls Mr. Panda Shirt",
    "Sleeveless Unicorn Patch Gown - Pink",
    "Cotton Mull Embroidered Dress",
    "Blue Cotton Indie Mickey Dress",
    "Long Maxi Tulle Fancy Dress Up Outfits -Pink",
    "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi",
    "Colour Blocked Shirt – Sky Blue",
    "Pure Cotton V-Neck T-Shirt",
    "Green Side Placket Detail T-Shirt",
    "Premium Polo T-Shirts",
    "Pure Cotton Neon Green Tshirt",
    "Soft Stretch Jeans",
    "Regular Fit Straight Jeans",
    "Grunt Blue Slim Fit Jeans",
    "Rose Pink Embroidered Maxi Dress",
    "Cotton Silk Hand Block Print Saree",
    "Rust Red Linen Saree",
    "Beautiful Peacock Blue Cotton Linen Saree",
    "Lace Top For Women",
    "GRAPHIC DESIGN MEN T SHIRT - BLUE"
];