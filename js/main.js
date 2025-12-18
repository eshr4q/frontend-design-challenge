document.addEventListener('DOMContentLoaded', () => {
    
    // --- RANGE SLIDER LOGIC ---
    const rangeInput = document.getElementById('rangeInput');
    const displayValue = document.getElementById('displayValue');
    const labelContainer = document.getElementById('labelContainer');

    // Convert English to Persian
    function toPersianDigits(num) {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, x => farsiDigits[x]);
    }


    function setupLabels() {
        if (!labelContainer) return;
        labelContainer.innerHTML = ''; 
        for (let i = 10; i <= 100; i += 10) {
            const span = document.createElement('span');
            span.textContent = toPersianDigits(i);
            labelContainer.appendChild(span);
        }
    }

    // Update slider gradient and value
    function updateSlider() {
        if (!rangeInput) return;
        
        const val = parseInt(rangeInput.value);
        const min = parseInt(rangeInput.min);
        const max = parseInt(rangeInput.max);

        // Calculate percentage for gradient
        const percentage = ((val - min) / (max - min)) * 100;

        // Apply to CSS Variable
        rangeInput.style.setProperty('--progress', `${percentage}%`);

        // Update Text
        if (displayValue) {
            displayValue.textContent = toPersianDigits(val);
        }
    }

    // Initialize
    setupLabels();
    if (rangeInput) {
        rangeInput.addEventListener('input', updateSlider);
        updateSlider(); // Run once on load
    }
});