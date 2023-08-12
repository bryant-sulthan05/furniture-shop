import Products from "../models/Products.js";
import path from 'path';
import fs from 'fs';

// Get all products
export const getProducts = async (req, res) => {
    try {
        const response = await Products.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Get Product by id
export const getProductById = async (req, res) => {
    try {
        const response = await Products.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

// Create a new Product
export const createProduct = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: 'No File added' }); // if file didn't exist
    const { product_name, description, price, discount } = req.body;
    const file = req.files.file;
    const size = file.data.length;
    const ext = path.extname(file.product_name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" }); // if the image is not in the allowed

    if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" }); // if size is more than 200MB

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Products.create({
                product_name: product_name,
                description: description,
                image: fileName,
                url: url,
                price: price,
                discount: discount
            });
            res.status(201).json({ msg: "Product added successfully" });
        } catch (error) {
            console.log(error.message);
        }
    });
}
export const updateProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Product didn`t found" });
    let fileName = "";
    if (req.files === null) {
        fileName = Products.image;
    } else {
        const file = req.files.file;
        const size = file.data.length;
        const ext = path.extname(file.product_name);
        fileName = file.md5 + ext;
        const allowedType = ['.jpeg', '.jpg', '.png', '.mp4', '.mp3'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid image" });

        if (size > 200000000) return res.status(422).json({ msg: "Image must be less than 200MB" });

        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const { name, price } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Products.update({
            product_name: product_name,
            description: description,
            image: fileName,
            url: url,
            price: price,
            discount: discount
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Product update successfully" });
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteProduct = async (req, res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!product) return res.status(404).json({ msg: "Product didn`t found" });

    try {
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);
        await Products.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: "Product has been deleted" });
    } catch (error) {
        console.log(error.message);
    }
}