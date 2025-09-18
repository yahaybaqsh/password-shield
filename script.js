// =======================
// PASSWORD SHIELD — مولد كلمات مرور آمنة
// =======================

const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const passwordDisplay = document.getElementById('password');
const copyBtn = document.getElementById('copy');

// تحديث قيمة الطول عند التحرك
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

// توليد كلمة مرور عشوائية
function generatePassword() {
  const length = parseInt(lengthSlider.value);
  let charset = '';
  let password = '';

  // بناء مجموعة الأحرف بناءً على التحقق
  if (uppercaseCheck.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercaseCheck.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbersCheck.checked) charset += '0123456789';
  if (symbolsCheck.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // التحقق من وجود أحرف على الأقل
  if (charset.length === 0) {
    alert('يرجى اختيار نوع واحد على الأقل من الأحرف!');
    return;
  }

  // توليد كلمة مرور باستخدام crypto.getRandomValues (أكثر أمانًا من Math.random)
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  passwordDisplay.textContent = password;
}

// نسخ كلمة المرور إلى الحافظة
copyBtn.addEventListener('click', () => {
  if (passwordDisplay.textContent === 'اضغط على "إنشاء" لإنشاء كلمة مرور') {
    alert('يرجى إنشاء كلمة مرور أولًا!');
    return;
  }

  navigator.clipboard.writeText(passwordDisplay.textContent).then(() => {
    copyBtn.textContent = 'تم النسخ!';
    setTimeout(() => {
      copyBtn.textContent = 'نسخ';
    }, 2000);
  }).catch(err => {
    console.error('فشل النسخ: - script.js:62', err);
    alert('فشل نسخ كلمة المرور. يرجى استخدام Ctrl+C يدويًا.');
  });
});

// توليد كلمة مرور عند الضغط على الزر
generateBtn.addEventListener('click', generatePassword);

// توليد كلمة مرور افتراضية عند التحميل
window.addEventListener('load', generatePassword);