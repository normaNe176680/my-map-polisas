document.addEventListener("DOMContentLoaded", () => {
    // Inject custom CSS to enlarge the guide popups and buttons
    const style = document.createElement('style');
    style.innerHTML = `
        .driver-popover {
            min-width: 320px !important;
            max-width: 450px !important;
            padding: 24px !important;
            font-size: 16px !important;
            border-radius: 16px !important;
        }

        .driver-popover-title {
            font-size: 20px !important;
            font-weight: bold !important;
            margin-bottom: 12px !important;
        }

        .driver-popover-description {
            font-size: 16px !important;
            line-height: 1.5 !important;
            color: #444 !important;
            margin-bottom: 20px !important;
        }

        .driver-popover-footer {
            margin-top: 15px !important;
        }

        .driver-popover-btn-group {
            gap: 10px !important;
        }

        /* Enlarge Next, Back, and Done Buttons */
        .driver-popover-next-btn, 
        .driver-popover-prev-btn,
        .driver-popover-close-btn {
            font-size: 16px !important;
            padding: 12px 24px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            height: auto !important;
            line-height: 1.2 !important;
            text-shadow: none !important;
        }

        .driver-popover-next-btn {
            background-color: #ff0000 !important;
            color: #ffffff !important;
            border: none !important;
        }

        .driver-popover-next-btn:hover {
            background-color: #cc0000 !important;
        }

        .driver-popover-progress-text {
            font-size: 14px !important;
            color: #666 !important;
        }
    `;
    document.head.appendChild(style);

    // Check if the user has already completed or skipped the guide
    const hasSeenGuide = localStorage.getItem("polisas_guide_seen");

    if (!hasSeenGuide && typeof window.driver !== "undefined") {
        const driver = window.driver.js.driver;

        const driverObj = driver({
            showProgress: true,
            animate: true,
            allowClose: true,
            doneBtnText: 'Selesai',
            nextBtnText: 'Next',
            prevBtnText: 'Back',
            progressText: '{{current}} / {{total}}',
            
            // Mark guide as completed if closed or finished
            onDestroyed: () => {
                localStorage.setItem("polisas_guide_seen", "true");
            },
            
            steps: [
                {
                    element: 'body',
                    popover: {
                        title: 'Welcome to My POLISAS Map! 👋',
                        description: 'Mari kami tunjukkan cara mudah untuk menavigasi dan mencari kawasan di sekitar kampus POLISAS.',
                        side: "center",
                        align: 'center'
                    }
                },
                {
                    element: '.search-wrapper',
                    popover: {
                        title: 'Carian Pantas 🔍',
                        description: 'Gunakan ruang carian ini untuk mencari bilik, blok, atau tempat dengan serta-merta.',
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '.card-container',
                    popover: {
                        title: 'Pilihan Kategori 🏫',
                        description: 'Atau anda boleh memilih mana-mana kategori di sini seperti Bangunan, Kamsis, Kemudahan, atau Parkir.',
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: '#panorama-viewer',
                    popover: {
                        title: 'Paparan 360° 🔄',
                        description: 'Di dalam halaman lokasi, anda boleh meleret (scroll/drag) imej ini untuk melihat pandangan 360 darjah kawasan tersebut.',
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#googleMapsLink',
                    popover: {
                        title: 'Navigasi Google Maps 📍',
                        description: 'Tekan butang ini jika anda ingin membuka arah pemanduan terus ke lokasi menerusi Google Maps.',
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: 'body',
                    popover: {
                        title: 'Selamat Menggunakan! 🎉',
                        description: 'Selesai! Selamat menggunakan MyPolisas Map.',
                        side: "center",
                        align: 'center'
                    }
                }
            ]
        });

        // Start the guide walkthrough
        driverObj.drive();
    }
});