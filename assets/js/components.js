document.addEventListener("DOMContentLoaded", () => {
    
    const basePath = window.location.pathname.includes("/page/") ? "../components/" : "components/";

    const components = [
        { target: "#loader-component", file: "loader.html" },
        { target: "#topbar-component", file: "topbar.html" },
        { target: "#header-component", file: "header.html" },
        { target: "#footer-component", file: "footer.html" },
        { target: "#hero-cards-component", file: "hero-cards.html" },
        { target: "#hero-stats-component", file: "hero-stats.html" },
        { target: "#service-cards-component", file: "service-cards.html" },
        { target: "#billing-cards-component", file: "billing-cards.html" },
        { target: "#news-cards-component", file: "news-cards.html" }
    ];

    const loadComponent = async ({ target, file }) => {
        const container = document.querySelector(target);
        if (!container) return;

        try {
            const url = `${basePath}${file}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const html = await response.text();
            
            // KODE YANG DIPERBAIKI: Gunakan outerHTML, bukan innerHTML.
            // Ini akan mengganti <div id="..."> sepenuhnya agar struktur CSS tidak rusak.
            container.outerHTML = html;
            
        } catch (error) {
            console.error("Gagal memuat komponen:", error);
        }
    };

    Promise.all(components.map(loadComponent)).then(() => {
        document.dispatchEvent(new CustomEvent("components:loaded"));
    });

});