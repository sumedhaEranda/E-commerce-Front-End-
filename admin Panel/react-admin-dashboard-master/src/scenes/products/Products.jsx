import { Box, Button, TextField, MenuItem, Input } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from "firebase/auth";
import app from '../../components/firebase/firebase';
import axios from 'axios';
import React, { useRef, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Product from '../../scenes/products/Product.css'

const Products = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [productExists, setProductExists] = useState(false);
    const [Products, setCreateProduct] = useState(false);
    const [image, setImage] = useState(null);
    const [isProductAdded, setIsProductAdded] = useState(false);

    const handleFormSubmit = async (values) => {
        try {
            const productName = values.title;

            // Check if product name is already stored
            const response = await axios.get(`http://localhost:8081/api/v1/product/check/${productName}`);
            const isProductNameTaken = response.data;
            console.log(isProductNameTaken);
            if (true === isProductNameTaken) {
                // Handle case when product name is already taken
                console.log("Product name already exists!");
                setProductExists(true);
                return;
            }
            else {
                // Upload the image file to Firebase storage and get the download URL
                const file = image;
                const storageRef = ref(getStorage(app), `images/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Add the image download URL to the form values
                values.imgpath = downloadURL;

                // Submit the form data to the server
                await axios.post('http://localhost:8081/api/v1/product/AddProduct', values);
                setIsProductAdded(true);
                // Clear the form fields
                values.title = "";
                values.price = "";
                values.category = "";
                values.description = "";
                setImage(null);
                // Handle successful form submission
                console.log("Form submitted successfully!");
            }


        } catch (error) {
            // Handle form submission error
            console.error("Error submitting form:", error);
        }


    };
    const check = (event) => {
        //   setUserExists(false);
        //   setusercreate(false);
    };


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    return (

        <Box m="20px">
            <Header title="Add PRODUCT" subtitle="Add a New Product" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Prodct Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onClick={check}
                                value={values.title}
                                name="title"
                                error={!!touched.title && !!errors.title}
                                helperText={touched.title && errors.title}
                                sx={{ gridColumn: "span 2" }}
                            />



                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onClick={check}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onClick={check}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 4" }}
                            />


                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                label="Category "
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onClick={check}
                                value={values.category}
                                name="category"
                                error={!!touched.category && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}
                            >
                                <MenuItem value="Pizza">Pizza</MenuItem>
                                <MenuItem value="Burger">Burger</MenuItem>
                                <MenuItem value="Bread">Bread</MenuItem>
                            </TextField>

                            <Box>
                                <Input type="file"
                                    onChange={handleImageChange}

                                    accept="image/*" />
                                {image && <img src={URL.createObjectURL(image)} width={200} height={200} alt="Uploaded Image" />}
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New User
                            </Button>

                        </Box>
                        {isProductAdded && (
                            <Box mt={2} class="ok-message" color="green">
                                Product added successfully!
                            </Box>
                        )}
                        {productExists && (
                            <Box mt={2} class="erro-message" color="green">
                            Product  already Added!
                            </Box>
                        )}

                    </form>
                )}
            </Formik>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    title: yup.string().required("required"),
    price: yup.string().required("required"),
    category: yup.string().required("required"),
    description: yup.string().required("required"),
});
const initialValues = {

    title: "",
    price: "",
    category: "",
    description: ""
};

export default Products;
