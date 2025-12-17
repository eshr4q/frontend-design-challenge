document.addEventListener('DOMContentLoaded', () => {
    
    const rangeInput = document.getElementById('rangeInput');
    const displayValue = document.getElementById('displayValue');
    const labelContainer = document.getElementById('labelContainer');

    // English to Persian convertor 
    function toPersianDigits(num) {
        const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, x => farsiDigits[x]);
    }

    // Labels
    function setupLabels() {
        labelContainer.innerHTML = ''; 
        for (let i = 10; i <= 100; i += 10) {
            const span = document.createElement('span');
            span.textContent = toPersianDigits(i);
            labelContainer.appendChild(span);
        }
    }

    function updateSlider() {
        const val = parseInt(rangeInput.value);
        const min = parseInt(rangeInput.min);
        const max = parseInt(rangeInput.max);


        const percentage = ((val - min) / (max - min)) * 100;


        rangeInput.style.setProperty('--progress', `${percentage}%`);


        displayValue.textContent = toPersianDigits(val);
    }

    setupLabels();
    

    rangeInput.addEventListener('input', updateSlider);
    
    updateSlider();
});