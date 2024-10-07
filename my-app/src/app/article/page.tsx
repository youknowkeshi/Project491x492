"use client"
import React, { useState, useEffect } from "react";
import { Navbar } from "../component/Navbar";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { Button } from "flowbite-react";

type Props = {};

interface Article {
  id: string;
  text_content: string | null;
  image_url: string[] | null; // เปลี่ยนจาก image_url เป็น image_urls
}



export default function page({ }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);;

  async function showarticle() {
    const apiUrl = `https://entaneermindbackend-for-servereng.onrender.com/api/img/get`;
    try {
      const response = await axios.get(apiUrl);
      setArticles(response.data);
    } catch (error) {
      console.log("Can't show article: ", error);
    }
  }



  useEffect(() => {
    showarticle()
  }, [])

  return (
    <>
      <Navbar />
      <header className="bg-whit shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
            บทความ
          </h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto">
        {/* แสดงรายการบทความ */}
        <div className="max-w-7xl mx-auto">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="bg-white shadow border p-4 mb-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                <div>

                  {article.image_url && article.image_url.length > 0 ? (
                    article.image_url.map((url: string, index: number) => (
                      // <p key={index}>{url}</p>
                      <img
                        key={index}
                        src={url}
                        alt={`Image ${index + 1} of article ${article.id}`}
                        className="mt-4 rounded-lg shadow-md w-full h-auto object-cover"
                      />
                    ))
                  ) : null}



                </div>
                <div className="col-span-2 mx-8 my-8">
                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">{article.text_content || ""}</p>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}
