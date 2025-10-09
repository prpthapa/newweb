$(document).ready(function () {

    const navbar = $('#navbar');

    // ----------- Navbar toggle & scroll animation (all pages) ----------
    $('.fa-bars').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        if ($(window).scrollTop() > 30) {
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');
        }

        $('section').each(function () {
            let top = $(window).scrollTop();
            let height = $(this).height();
            let id = $(this).attr('id');
            let offsetTop = $(this).offset().top - 200;

            if (top >= offsetTop && top < offsetTop + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find('a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // ----------- Carousel & fullscreen (only if carousel exists) ----------
    if ($('.carousel').length) {
        const images = document.querySelectorAll(".carousel img");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        let current = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove("active"));
            current = (index + images.length) % images.length;
            images[current].classList.add("active");
            updatePageNumber();
        }

        function updatePageNumber() {
            const pageNum = document.querySelector(".page-number");
            if (pageNum) pageNum.textContent = `${current + 1} / ${images.length}`;
        }

        prevBtn.addEventListener("click", () => showImage(current - 1));
        nextBtn.addEventListener("click", () => showImage(current + 1));
        showImage(0);

        // Fullscreen overlay
        images.forEach(img => {
            img.addEventListener("click", () => {
                const overlay = document.createElement("div");
                overlay.className = "fullscreen";
                const bigImg = document.createElement("img");
                bigImg.src = img.src;
                overlay.appendChild(bigImg);
                document.body.appendChild(overlay);

                // Hide navbar when fullscreen is active
                navbar.addClass("hidden");

                // Close fullscreen on click
                overlay.addEventListener("click", () => {
                    overlay.remove();
                    navbar.removeClass("hidden");
                });

                // Close fullscreen on ESC key
                document.addEventListener("keydown", function escHandler(e) {
                    if (e.key === "Escape") {
                        overlay.remove();
                        navbar.removeClass("hidden");
                        document.removeEventListener("keydown", escHandler);
                    }
                });
            });
        });
    }

});
