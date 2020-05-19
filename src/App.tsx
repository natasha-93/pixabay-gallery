import React, { useState, useEffect } from "react";
import Photo from "./Photo";
import { IPhoto } from "./models/Photo";
import Form from "./Form";

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log(photos);

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchTerm}&image_type=photo`
    )
      .then((response) => response.json())
      .then(({ hits }) => {
        const photos = hits.map((hit: any) => ({
          ...hit,
          tags: hit.tags.split(", "),
        }));
        setPhotos(photos);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm]);

  return (
    <div className="container mx-auto">
      <Form onSearch={setSearchTerm} />

      {!isLoading && photos.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="flex">
          <div className="sm:grid mx-auto sm:grid-cols-3 sm:gap-4">
            {photos.map((photo) => {
              return <Photo key={photo.id} {...photo} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
