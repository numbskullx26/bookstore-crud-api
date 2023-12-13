import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Book from "./routes/Book/book";
import SingleBook from "./routes/Book/singleBook";
import CreateBook from "./routes/Book/createBook";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Book />} />
        <Route path="/books/:slug" element={<SingleBook />} />
        <Route path="/createBook" element={<CreateBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
