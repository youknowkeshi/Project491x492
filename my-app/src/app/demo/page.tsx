"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

function App() {
    const [image, setImage] = useState<File | null>(null);
    const [allImage, setAllImage] = useState<Array<{ image: string }> | null>([]);
    const [test, setTest] = useState([])


    const submitImage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!image) return;
    
        const formData = new FormData();
        formData.append("image", image); // "image" ต้องตรงกับใน multer
    
        try {
            const result = await axios.post(
                "http://localhost:3001/addimg",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(result.data);
            setTest(result.data);
    
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            setImage(e.target.files[0]);
        }
    };

    async function OAuth(code:string) {
        const apiUrl = 'http://localhost:3001/api/google/redirect';
        try {    
            const response = await axios.post(apiUrl, { code });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function getinfo() {
        const apiUrl = 'http://localhost:3001/api/google/getinfo';
        try {    
            const response = await axios.get(apiUrl);
            console.log('Response:', response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }



    useEffect(() => {
        getinfo()

    },[])

    return (
        <div>
            <form onSubmit={submitImage}>
                <input type="file" accept="image/*" onChange={onInputChange}></input>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h1>
                    wddw{test}
                </h1>
            </div>
            {allImage &&
                allImage.map((data, index) => {
                    return (
                        <img
                            key={index}
                            src={`http://localhost:3001/uploads/${data.image}`} // Adjust the URL to match your backend
                            height={100}
                            width={100}
                            alt={`Uploaded ${index}`}
                        />

                    );

                })}
        </div>
    );
}

export default App;
