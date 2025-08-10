import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ------------------- CLOUDINARY UPLOAD -------------------
export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.secure_url; // Return URL
};

// ------------------- CATEGORIES -------------------
export const getAllCategories = async () => {
  const snapshot = await getDocs(collection(db, "categories"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createCategory = async ({ title, imageFile }) => {
  let imageUrl = "";
  if (imageFile) {
    imageUrl = await uploadImageToCloudinary(imageFile);
  }
  return await addDoc(collection(db, "categories"), {
    title,
    img: imageUrl || null,
  });
};

export const deleteCategory = async (id) => {
  await deleteDoc(doc(db, "categories", id));
  return true;
};

// ------------------- PRODUCTS -------------------
export const getAllProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const productDoc = await getDoc(doc(db, "products", id));
  if (!productDoc.exists()) throw new Error("Product not found");
  return { id: productDoc.id, ...productDoc.data() };
};

export const addProductToFirebase = async (productData) => {
  const price = Number(productData.price);
  if (isNaN(price)) throw new Error("Invalid price");

  const rating = Number(productData.rating) || 0; 

  let imageUrl = "";
  if (productData.img instanceof File) {
    imageUrl = await uploadImageToCloudinary(productData.img);
  }

  return await addDoc(collection(db, "products"), {
    title: productData.title,
    price,
    desc: productData.description || "", 
    category: productData.category,
    rating,
    img: imageUrl || null,
  });
};

export const updateProduct = async (id, updatedData) => {
  const price = Number(updatedData.price);
  if (isNaN(price)) throw new Error("Invalid price");

  const rating = Number(updatedData.rating) || 0; // decimal allowed

  let imageUrl = updatedData.imgUrl || updatedData.img || "";
  if (updatedData.img instanceof File) {
    imageUrl = await uploadImageToCloudinary(updatedData.img);
  }

  await updateDoc(doc(db, "products", id), {
    title: updatedData.title,
    price,
    desc: updatedData.description || "",
    category: updatedData.category,
    rating,
    img: imageUrl,
  });
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
  return true;
};
