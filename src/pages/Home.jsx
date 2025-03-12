import { useState, useEffect } from "react";
import { getAllCategories } from "../api";
import { Preloader } from "../components/Preloader";
import { CategoryList } from "../components/CategoryList";
import { Search } from "../components/Search";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    const { search } = useLocation();
    const navigate = useNavigate();

    console.log("Текущий поиск в URL:", search);


    useEffect(() => {
        getAllCategories().then(data => {
            if (data && data.categories) {
                setCatalog(data.categories);
                const searchParams = new URLSearchParams(search);
                const searchQuery = searchParams.get("search") || "";

                if (searchQuery) {
                    setFilteredCatalog(
                        data.categories.filter(item =>
                            item.strCategory && item.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    );
                } else {
                    setFilteredCatalog(data.categories);
                }
            } else {
                console.error("⚠ Ошибка: API не вернул `categories`");
                setCatalog([]);
                setFilteredCatalog([]);
            }
        }).catch(error => console.error("❌ Error API:", error));
    }, [search]);


    const handleSearch = (str = "") => {
        navigate(`?search=${str}`);
    };

    return (
        <>
            <Search cb={handleSearch} />
            {!catalog.length ? <Preloader /> : (
                <CategoryList catalog={filteredCatalog} />
            )}
        </>
    );
}

export { Home };
