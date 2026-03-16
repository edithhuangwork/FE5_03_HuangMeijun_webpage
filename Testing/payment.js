document.addEventListener('DOMContentLoaded', function() {
    let selectedMethod = '';
    
    // 獲取元素
    const methodCards = document.querySelectorAll('.method-card');
    const cardDetails = document.getElementById('cardDetails');
    const quickPay = document.getElementById('quickPay');
    const confirmBtn = document.getElementById('confirmBtn');
    const payNowBtn = document.getElementById('payNowBtn');
    
    // 點擊支付方式
    methodCards.forEach(card => {
        card.addEventListener('click', function() {
            // 移除所有選中狀態
            methodCards.forEach(c => c.classList.remove('selected'));
            
            // 添加選中狀態
            this.classList.add('selected');
            selectedMethod = this.dataset.method;
            
            togglePaymentForms();
        });
        
        // 鍵盤支援
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 切換表單顯示
    function togglePaymentForms() {
        if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
            cardDetails.classList.add('show');
            quickPay.classList.remove('show');
        } else {
            cardDetails.classList.remove('show');
            quickPay.classList.add('show');
        }
        
        updateConfirmButton();
    }
    
    // 更新確認按鈕
    function updateConfirmButton() {
        if (selectedMethod) {
            confirmBtn.classList.add('enabled');
            confirmBtn.textContent = 'Confirm Payment';
        } else {
            confirmBtn.classList.remove('enabled');
            confirmBtn.textContent = 'Select Payment Method';
        }
    }
    
    // 快速支付
    payNowBtn.addEventListener('click', function() {
        alert(`Redirecting to ${selectedMethod.toUpperCase()}...\n✅ Payment processing!`);
    });
    
    // 確認支付
    confirmBtn.addEventListener('click', function() {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }
        
        if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
            const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
            if (cardNum.length < 15) {
                alert('Please enter a valid card number (15-16 digits)');
                return;
            }
        }
        
        alert(`✅ Payment confirmed with ${selectedMethod.toUpperCase()}!\nThank you for your purchase!`);
    });
    
    // 信用卡號自動格式化
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    
    // 到期日自動格式化
    document.getElementById('expiryDate').addEventListener('input', formatExpiryDate);
});

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    
    e.target.value = parts.join(' ');
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}
