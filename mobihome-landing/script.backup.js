document.addEventListener('DOMContentLoaded', () => {
    // ================= SMOOTH SCROLLING =================
    const ctaBtn = document.getElementById('ctaBtn');
    const bookingSection = document.getElementById('booking-section');

    if (ctaBtn && bookingSection) {
        ctaBtn.addEventListener('click', () => {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ================= WEB SHARE API / COPY LINK =================
    const shareBtn = document.getElementById('shareBtn');
    const toast = document.getElementById('toast');

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Mobihome KTPM Nhóm 1 - Dịch vụ Thuê Xe RV/Motorhome',
                text: 'Cùng khám phá thế giới theo cách riêng của bạn với dịch vụ cho thuê xe nhà lưu động (RV/Motorhome) đẳng cấp.',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Lỗi khi chia sẻ:', err);
                }
            } else {
                // Fallback: Copy link to clipboard
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    showToast('Đã sao chép đường dẫn!');
                } catch (err) {
                    showToast('Không thể sao chép đường dẫn.');
                }
            }
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ================= FORM VALIDATION =================
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');

    if (form) {
        // Prevent default validation
        form.setAttribute('novalidate', true);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Validate Text Inputs (Họ tên)
            const fullName = document.getElementById('fullName');
            if (fullName.value.trim() === '') {
                setError(fullName);
                isValid = false;
            } else {
                setSuccess(fullName);
            }

            // 2. Validate Age (>= 18)
            const age = document.getElementById('age');
            if (age.value.trim() === '' || parseInt(age.value) < 18) {
                setError(age);
                isValid = false;
            } else {
                setSuccess(age);
            }

            // 3. Validate Phone (10-11 digits)
            const phone = document.getElementById('phone');
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                setError(phone);
                isValid = false;
            } else {
                setSuccess(phone);
            }

            // 4. Validate Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                setError(email);
                isValid = false;
            } else {
                setSuccess(email);
            }

            // 5. Validate Dates
            const pickupDate = document.getElementById('pickupDate');
            const returnDate = document.getElementById('returnDate');
            
            if (pickupDate.value === '') {
                setError(pickupDate);
                isValid = false;
            } else {
                setSuccess(pickupDate);
            }

            if (returnDate.value === '' || (pickupDate.value && new Date(returnDate.value) <= new Date(pickupDate.value))) {
                setError(returnDate);
                isValid = false;
            } else {
                setSuccess(returnDate);
            }

            // 6. Validate Selects (Loại xe, Kiểu xe, Thanh toán)
            const selects = ['vehicleType', 'vehicleClass', 'paymentMethod'];
            selects.forEach(id => {
                const el = document.getElementById(id);
                if (el.value === '') {
                    setError(el);
                    isValid = false;
                } else {
                    setSuccess(el);
                }
            });

            // If form is valid, submit (simulate success)
            if (isValid) {
                // Here you would typically send data to a server using fetch()
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Reset form when clicking "Đặt chuyến đi khác"
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            form.reset();
            // Remove success classes
            const controls = form.querySelectorAll('.form-control');
            controls.forEach(control => control.classList.remove('success', 'error'));
            
            successMessage.style.display = 'none';
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Helper functions for validation
    function setError(input) {
        const formControl = input.closest('.form-control');
        formControl.classList.add('error');
        formControl.classList.remove('success');
    }

    function setSuccess(input) {
        const formControl = input.closest('.form-control');
        formControl.classList.remove('error');
        formControl.classList.add('success');
    }

    // Real-time validation removal on input
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const formControl = input.closest('.form-control');
            if (formControl.classList.contains('error')) {
                formControl.classList.remove('error');
            }
        });
    });
});
