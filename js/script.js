/* ==========================================
   ==========================================
   FILE: script.js
   DESKRIPSI: JavaScript untuk website KKN Kelompok 43 Uncen
   TANGGAL: 2026
   ==========================================
   ========================================== */

// ==========================================
// 1. TOMBOL KEMBALI KE ATAS (BACK TO TOP)
// ==========================================

/**
 * Elemen tombol "Kembali ke Atas" yang diambil dari HTML
 * Tombol ini akan muncul saat pengguna scroll ke bawah
 */
const btnAtas = document.getElementById("tombolAtas");

/**
 * Event listener untuk mendeteksi scroll pada halaman
 * Menggunakan throttle untuk performa yang lebih baik
 */
let timerScroll = null; // Timer untuk throttle

window.addEventListener("scroll", function() {
    // Throttle: menjalankan fungsi maksimal 1x per 100ms
    if (timerScroll) return;
    
    timerScroll = setTimeout(function() {
        pantauScrollLayar();
        timerScroll = null;
    }, 100);
});

/**
 * Fungsi untuk memantau posisi scroll dan menampilkan/menyembunyikan tombol
 * Tombol muncul saat scroll melewati 300px dari atas
 */
function pantauScrollLayar() {
    // Menghitung posisi scroll yang kompatibel dengan semua browser
    const scrollPosisi = window.pageYOffset || 
                        document.documentElement.scrollTop || 
                        document.body.scrollTop || 0;
    
    // Jika scroll lebih dari 300px, tampilkan tombol
    if (scrollPosisi > 300) {
        btnAtas.style.display = "flex"; // Gunakan flex untuk centering icon
        btnAtas.style.opacity = "1";
    } else {
        btnAtas.style.display = "none";
        btnAtas.style.opacity = "0";
    }
}

/**
 * Event listener untuk klik tombol "Kembali ke Atas"
 * Menggulir halaman ke atas dengan efek halus (smooth)
 */
btnAtas.addEventListener("click", function(e) {
    e.preventDefault(); // Mencegah perilaku default jika ada
    
    // Scroll ke atas dengan efek smooth
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth" // Efek scrolling halus
    });
});

// ==========================================
// 2. NAVBAR COLLAPSE OTOMATIS (Mobile)
// ==========================================

/**
 * Menutup menu navbar secara otomatis setelah link diklik
 * Ini meningkatkan pengalaman pengguna di perangkat mobile
 */
document.addEventListener("DOMContentLoaded", function() {
    // Ambil semua link di dalam navbar
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    
    // Ambil elemen toggle navbar (tombol hamburger)
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    
    // Jika navbar memiliki toggle dan collapse
    if (navbarToggler && navbarCollapse) {
        // Untuk setiap link di navbar
        navLinks.forEach(function(link) {
            // Tambahkan event listener klik
            link.addEventListener("click", function() {
                // Cek apakah navbar sedang terbuka (di mobile)
                if (navbarCollapse.classList.contains("show")) {
                    // Simulasikan klik pada tombol toggle untuk menutup
                    navbarToggler.click();
                }
            });
        });
    }
});

// ==========================================
// 3. ANIMASI SCROLL UNTUK ELEMEN
// ==========================================

/**
 * Menggunakan Intersection Observer untuk animasi elemen saat muncul di layar
 * Elemen dengan kelas 'animasi-muncul' akan dianimasikan saat terlihat
 */
document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah browser mendukung Intersection Observer
    if ("IntersectionObserver" in window) {
        
        // Pilih semua elemen yang akan dianimasikan
        const elemenAnimasi = document.querySelectorAll(".animasi-muncul");
        
        // Buat observer dengan konfigurasi
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                // Jika elemen terlihat di layar
                if (entry.isIntersecting) {
                    // Tambahkan kelas 'muncul' untuk memicu animasi
                    entry.target.classList.add("muncul");
                    // Hentikan pengamatan setelah elemen muncul
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Muncul saat 15% elemen terlihat
            rootMargin: "0px 0px -50px 0px" // Sedikit offset
        });
        
        // Mulai mengamati setiap elemen
        elemenAnimasi.forEach(function(el) {
            observer.observe(el);
        });
        
    } else {
        // Fallback untuk browser yang tidak mendukung Intersection Observer
        // Langsung tampilkan semua elemen
        document.querySelectorAll(".animasi-muncul").forEach(function(el) {
            el.classList.add("muncul");
        });
    }
});

// ==========================================
// 4. PREVENT DOUBLE SUBMIT (Untuk Form)
// ==========================================

/**
 * Mencegah pengiriman form ganda (double submit)
 * Berguna jika ada form di website
 */
document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll("form");
    
    forms.forEach(function(form) {
        form.addEventListener("submit", function(e) {
            // Ambil tombol submit di dalam form
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            
            if (submitBtn) {
                // Nonaktifkan tombol submit agar tidak bisa diklik dua kali
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Mengirim...';
                
                // Aktifkan kembali setelah 3 detik (jika belum ter-submit)
                setTimeout(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtn.getAttribute("data-original-text") || "Kirim";
                }, 3000);
            }
        });
    });
});

// ==========================================
// 5. LAZY LOADING UNTUK IFRAME / GAMBAR
// ==========================================

/**
 * Menerapkan lazy loading untuk iframe Google Maps dan gambar
 * Ini meningkatkan performa halaman
 */
document.addEventListener("DOMContentLoaded", function() {
    // Untuk semua iframe dengan atribut data-src (lazy loading)
    const iframes = document.querySelectorAll('iframe[data-src]');
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    // Set src dari data-src
                    iframe.src = iframe.getAttribute("data-src");
                    // Hapus atribut data-src
                    iframe.removeAttribute("data-src");
                    // Hentikan pengamatan
                    observer.unobserve(iframe);
                }
            });
        }, {
            threshold: 0.1
        });
        
        iframes.forEach(function(iframe) {
            observer.observe(iframe);
        });
    } else {
        // Fallback: langsung load semua iframe
        iframes.forEach(function(iframe) {
            iframe.src = iframe.getAttribute("data-src");
            iframe.removeAttribute("data-src");
        });
    }
});

// ==========================================
// 6. SMOOTH SCROLL UNTUK ANCHOR LINK
// ==========================================

/**
 * Smooth scroll untuk semua anchor link internal
 * Contoh: <a href="#profil"> akan scroll halus ke section #profil
 */
document.addEventListener("DOMContentLoaded", function() {
    // Pilih semua anchor link yang menuju ke ID di halaman yang sama
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener("click", function(e) {
            // Ambil target ID dari href
            const targetId = this.getAttribute("href");
            
            // Cari elemen target di halaman
            const targetElement = document.querySelector(targetId);
            
            // Jika target ditemukan
            if (targetElement) {
                e.preventDefault(); // Mencegah perilaku default
                
                // Scroll ke target dengan efek smooth
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                
                // Update URL tanpa reload (opsional)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
});

// ==========================================
// 7. DETEKSI PERANGKAT MOBILE
// ==========================================

/**
 * Mendeteksi apakah pengguna mengakses dari perangkat mobile
 * Berguna untuk penyesuaian konten
 */
function isMobile() {
    return window.innerWidth <= 768;
}

// Jalankan saat load dan resize
window.addEventListener("resize", function() {
    // Bisa ditambahkan fungsi khusus untuk perubahan ukuran layar
    if (isMobile()) {
        document.body.classList.add("is-mobile");
    } else {
        document.body.classList.remove("is-mobile");
    }
});

// Jalankan pertama kali
if (isMobile()) {
    document.body.classList.add("is-mobile");
}

// ==========================================
// 8. KONSOLE INFORMASI (Untuk Developer)
// ==========================================

/**
 * Menampilkan informasi website di console browser
 * Berguna untuk debugging dan branding
 */
console.log("%c 🏫 KKN Kelompok 43 Uncen 2026 ", 
            "background: #004d73; color: #ffffff; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 8px;");
console.log("%c 🌴 Kepulauan Yapen, Papua ", 
            "background: #f4f8fc; color: #004d73; font-size: 14px; padding: 8px 16px; border-radius: 8px;");
console.log("%c 📱 Website Portofolio KKN ", 
            "background: #ffffff; color: #2c3e50; font-size: 13px; padding: 6px 14px; border-radius: 8px; border: 1px solid #004d73;");

// ==========================================
// 9. PREVENT CONTEXT MENU (OPSIONAL)
// ==========================================

/**
 * Mencegah klik kanan pada gambar untuk proteksi sederhana
 * (Tidak 100% aman, hanya sebagai pencegahan dasar)
 */
document.addEventListener("DOMContentLoaded", function() {
    // Hanya untuk gambar di galeri
    const gambar = document.querySelectorAll("#galeri img, .galeri-img");
    
    gambar.forEach(function(img) {
        img.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            // Tampilkan pesan sederhana (opsional)
            // alert("Gambar dilindungi hak cipta.");
        });
    });
});

// ==========================================
// 10. KINERJA & OPTIMASI
// ==========================================

/**
 * Menggunakan requestAnimationFrame untuk animasi yang smooth
 * dan mengurangi beban CPU
 */
let rafId = null;

// Fungsi untuk animasi dengan requestAnimationFrame
function animasiSmooth() {
    // Kode animasi di sini
    // Contoh: efek parallax sederhana
    const hero = document.querySelector("#beranda");
    if (hero && !isMobile()) {
        const scrollY = window.pageYOffset || 0;
        hero.style.backgroundPositionY = scrollY * 0.5 + "px";
    }
    
    // Lanjutkan animasi
    rafId = requestAnimationFrame(animasiSmooth);
}

// Mulai animasi hanya jika halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Hentikan animasi jika tab tidak aktif (menghemat resource)
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            // Tab tidak aktif - hentikan animasi
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        } else {
            // Tab aktif - mulai ulang animasi
            if (!rafId) {
                animasiSmooth();
            }
        }
    });
    
    // Mulai animasi
    if (!rafId) {
        animasiSmooth();
    }
});

// ==========================================
// AKHIR FILE script.js
// ==========================================
// ==========================================
// SCROLL REVEAL - ANIMASI MUNCUL
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll(".reveal");
    
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, {
            threshold: 0.15
        });
        
        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }
});

// ==========================================
// DARK MODE TOGGLE
// ==========================================

/**
 * Fungsi untuk toggle (menyalakan/mematikan) Dark Mode
 * Juga menyimpan preferensi user ke localStorage
 */
function toggleDarkMode() {
    // Toggle class dark-mode pada body
    document.body.classList.toggle("dark-mode");
    
    // Ambil tombol dark mode
    const btn = document.getElementById("darkModeBtn");
    
    if (document.body.classList.contains("dark-mode")) {
        // Dark Mode AKTIF - ganti ikon menjadi matahari
        btn.innerHTML = '<i class="bi bi-sun-fill"></i> <span class="d-none d-md-inline">Mode</span>';
        // Simpan preferensi
        localStorage.setItem("darkMode", "true");
    } else {
        // Dark Mode NONAKTIF - ganti ikon menjadi bulan
        btn.innerHTML = '<i class="bi bi-moon-fill"></i> <span class="d-none d-md-inline">Mode</span>';
        // Simpan preferensi
        localStorage.setItem("darkMode", "false");
    }
}

/**
 * Cek preferensi Dark Mode dari localStorage saat halaman dimuat
 * Jika sebelumnya user mengaktifkan Dark Mode, maka tetap aktif
 */
document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah user pernah mengaktifkan Dark Mode
    const darkModePreference = localStorage.getItem("darkMode");
    const btn = document.getElementById("darkModeBtn");
    
    if (darkModePreference === "true") {
        // Aktifkan Dark Mode
        document.body.classList.add("dark-mode");
        if (btn) {
            btn.innerHTML = '<i class="bi bi-sun-fill"></i> <span class="d-none d-md-inline">Mode</span>';
        }
    }
});

// ==========================================
// COOKIE CONSENT
// ==========================================

/**
 * Menerima cookie consent dan menyimpan ke localStorage
 * Juga menyembunyikan banner cookie
 */
function acceptCookie() {
    const cookieConsent = document.getElementById("cookie-consent");
    if (cookieConsent) {
        cookieConsent.style.display = "none";
        localStorage.setItem("cookie-consent", "true");
    }
}

/**
 * Cek apakah user sudah menerima cookie consent
 * Jika belum, tampilkan banner
 */
document.addEventListener("DOMContentLoaded", function() {
    const cookieConsent = document.getElementById("cookie-consent");
    if (cookieConsent && !localStorage.getItem("cookie-consent")) {
        // Tampilkan setelah 1 detik
        setTimeout(function() {
            cookieConsent.style.display = "block";
        }, 1000);
    }
});