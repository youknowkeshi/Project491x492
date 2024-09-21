"use client"
import React, { useState, useEffect } from "react";
import { Navbar } from "../component/์Navbar";
import { Carousel } from "flowbite-react";
import axios from "axios";

type Props = {};

interface Article {
  id: string;
  text_content: string | null;
  image_url: string | null;
}



export default function page({ }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);;

  async function showarticle() {
    const apiUrl = `http://localhost:3001/api/img/get`;
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
        <div >
          {/* แสดงรายการบทความ */}
          {articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                className="bg-whit shadow mx-[100px] max-w-7xl border p-4 mb-4 rounded-lg shadow-md grid grid-cols-3 gap-4 mt-10"
              >


                <div className=" ">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.id}
                      className="mt-4 rounded-lg shadow-md w-auto h-auto"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="col-span-2 ">
                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
                    {article.text_content || ""}
                  </p>
                </div>


              </div>
            ))
          ) : (
            <p>No articles available.</p>
          )}
        </div>
      </div>
    </>
  );
}
