import cloudinary from "cloudinary";

const cloudinaryConfig = {
    cloud_name: "dm9vdxcfp",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
};

console.log(cloudinaryConfig);

cloudinary.v2.config(cloudinaryConfig);

async function handler(req, res) {
    try {
        console.log("req.body: ", req.body);
        let { file } = req.body;

        const cloudinaryResponse = await cloudinary.v2.uploader.upload(file);
        console.log(cloudinaryResponse);
        return res.json({ message: "upload successful" });
    } catch (error) {
        console.log({ err: error.message });
        res.json({ message: "Hello! error occured" });
    }
}
export default handler;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "3mb"
        }
    }
};