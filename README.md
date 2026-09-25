# TechKart Admin

The admin panel for [TechKart](https://github.com/yatharthrathii/TechKart). Products, categories and orders for the storefront are managed from here.

Live: [tech-kart-admin.vercel.app](https://tech-kart-admin.vercel.app)

<img width="100%" alt="Admin dashboard with counts for products, categories and orders" src="https://github.com/user-attachments/assets/f81392c0-4264-4775-a171-fbc509bb64ab" />

## Why it is a separate app

The storefront and the admin panel share one Firebase project but nothing else. Keeping them apart means the customer bundle carries no admin code, the two can be deployed independently, and the admin origin can be locked down without touching the shop.

## What it does

**Products.** Create, edit and delete products. Images are uploaded straight from the browser to Cloudinary with an unsigned preset, and the returned URL is stored on the product document.

**Categories.** Create, edit and delete the categories the storefront filters by.

**Orders.** Every order placed on the storefront appears here. Moving one from pending to shipped to delivered updates what the customer sees on their profile.

## Access control

Login uses Firebase Authentication. Admin access is enforced in two places. In the client, an email allowlist and a session check keep the UI closed to anyone who is not an admin. On the server, Firestore security rules restrict writes to products, categories and orders to admin accounts, so the client check is a convenience and the rules are the guarantee. The rules live in the Firebase console for this project; if you deploy your own copy, write them before anything else.

## Stack

React 19, Vite, React Router, Tailwind CSS 4, Framer Motion. Firebase Authentication through its REST API, Cloud Firestore, Cloudinary for image hosting. Deployed on Vercel.

## Running it

```bash
npm install
cp .env.example .env    # Firebase values, plus a Cloudinary cloud name and unsigned upload preset
npm run dev
```

Add your admin email to the allowlist in `src/utils/auth.js` before signing up.

## Screenshots

**Products**
<img width="100%" alt="Product list with edit and delete actions" src="https://github.com/user-attachments/assets/b855740b-6ebd-46a1-9b2f-c432c38b4a75" />

**Add product**
<img width="100%" alt="Add product form with image upload" src="https://github.com/user-attachments/assets/67d5076e-b317-47ad-9c20-3370de42aadc" />

**Categories**
<img width="100%" alt="Category list" src="https://github.com/user-attachments/assets/77228e55-2ca8-4433-9d6d-68f25bcbbd38" />

**Add category**
<img width="100%" alt="Add category form" src="https://github.com/user-attachments/assets/c194b03a-68bc-4e5c-8bf9-29deeb773bc4" />

**Orders**
<img width="100%" alt="Order list with status controls" src="https://github.com/user-attachments/assets/2776f3ec-543d-48ac-bb7b-c2c1fc24cef5" />
