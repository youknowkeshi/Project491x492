"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

type Event = {
  event_id: string;
  start_datetime: string;
  end_datetime: string;
  room: string;
  personid: string;
  topic: string;
  firstname_lastname: string;
  studentid: string;
  phone: string;
  major: string;
  gender: string;
  facebookurl: string;
  role: string;
  organization_name: string;
  cmuaccount: string;
  accounttype: string;
  gradelevel: string;
};
function App() {
  const [image, setImage] = useState<File | null>(null);
  const [allImage, setAllImage] = useState<Array<{ image: string }> | null>([]);
  const [test, setTest] = useState([]);
  const [event_id, setEvent_Id] = useState<Event[]>([]);
  const imageUrl =
    "http://localhost:9011/demomind/AYegz0g6Gc9v57ZraY0R0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Entaneer_mind%2F20240920%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240920T184015Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5448b51a96c27fb765ad75ab8567c562f21b1ba58b6888a456e6398484c72cb5";

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

  async function OAuth(code: string) {
    const apiUrl = "http://localhost:3001/api/google/redirect";
    try {
      const response = await axios.post(apiUrl, { code });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function getinfo() {
    const apiUrl = "http://localhost:3001/api/google/getinfo";
    try {
      const response = await axios.get(apiUrl);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getmail() {
    const apiUrl = "http://localhost:3001/api/user/getmailandtime";
    try {
      const response = await axios.get(apiUrl);
      console.log("Response:", response.data);
      setEvent_Id(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getmail();
  }, []);

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        {event_id.length > 0 ? (
          event_id.map((event, index) => (
            <div key={index}>
              <p>{event.event_id}</p>
              <p>{event.start_datetime}</p>
              <p>{event.end_datetime}</p>
              <p>{event.firstname_lastname}</p>
              <p>{event.cmuaccount}</p>
              <p>{event.accounttype}</p>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div>
        <h1>แสดงรูปภาพจากลิงก์</h1>
        <img src={imageUrl} alt="Demo Image" />
      </div>
      {/* {allImage &&
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

                })} */}
    </div>
  );
}

export default App;
