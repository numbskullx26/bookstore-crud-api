import React from "react";
import { useState } from "react";
// import NoImageSelected from "../../assets/no-image-selected.jpg";

function createBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table([title, slug]);
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          slug: slug,
          stars: stars,
          description: description,
          category: categories,
        }),
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        This is where we use NodeJS, Express and MongoDB to grab some data. The
        data below is pulled from a mongoDb database.
      </p>
      {submitted ? (
        <p>Data submitted successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={handleSubmit}>
          <div className="col-1">
            <label>Upload Image</label>
            {/* <img src={NoImageSelected} alt="previewImage" /> */}
            <input type="file" accept="image/gif image/jpeg image/png" />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>
            <input type="submit" />
          </div>
        </form>
      )}
    </div>
  );
  s;
}

export default createBook;
