import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {NotFound} from "./pages/NotFound";
import {Category} from "./pages/Category";
import {Recipe} from "./pages/Recipe";


function App() {
    const basename = process.env.NODE_ENV === "production" ? "/Food_Project" : "/";
    return (
        <Router basename={basename}>
            <Header />
            <main className="container content">
                <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contacts" element={<Contact />}/>
                        <Route path="/category/:name" element={<Category />}/>
                        <Route path="/recipe/:id" element={<Recipe />}/>
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
