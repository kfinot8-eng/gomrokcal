
// قالب‌بندی ریال (بدون اعشار، با جداکننده هزارگان)
function formatIRR(n) {
    return Math.round(n).toLocaleString('en-US') + ' ﷼';
}

// قالب‌بندی دلار (دو رقم اعشار)
function formatUSD(n) {
    return '$' + n.toFixed(2).toLocaleString('en-US');
}

function calculate() {
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const entryTaxRate = parseFloat(document.getElementById('entryTaxRate').value) || 0;
    const fob = parseFloat(document.getElementById('fob').value) || 0;
    const freight = parseFloat(document.getElementById('freight').value) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    const cifUSD = fob + freight + insurance;
    const cifIRR = cifUSD * rate;
    const entryTax = cifIRR * (entryTaxRate / 100);
    const redCrescent = cifIRR * 0.001;
    const waste = cifIRR * 0.003;
    const otherCosts = 0;
    const vatBase = cifIRR + entryTax + redCrescent + waste - discount;
    const vat = vatBase * 0.10;
    const tax2 = cifIRR * 0.02;
    const total = entryTax + redCrescent + waste + vat + tax2 - discount;

    document.getElementById('results').innerHTML = `
        <div><b>ارزش CIF کالا (دلاری):</b> ${formatUSD(cifUSD)}</div>
        <div><b>ارزش CIF ریالی:</b> ${formatIRR(cifIRR)}</div>
        <div><b>حقوق ورودی:</b> ${formatIRR(entryTax)}</div>
        <div><b>هلال احمر:</b> ${formatIRR(redCrescent)}</div>
        <div><b>پسماند:</b> ${formatIRR(waste)}</div>
        <div><b>سایر هزینه‌های باکس ۴۳:</b> ${formatIRR(otherCosts)}</div>
        <div><b>مالیات بر ارزش افزوده (۱۰٪):</b> ${formatIRR(vat)}</div>
        <div><b>مالیات دو درصد:</b> ${formatIRR(tax2)}</div>
        <div><b>تخفیف بند ۴۹:</b> ${formatIRR(discount)}</div>
        <hr class="my-2">
        <div class="text-xl font-bold text-blue-700">مجموع پرداختی: ${formatIRR(total)}</div>
    `;
}

function resetForm() {
    document.querySelectorAll('input').forEach(i => {
        if (!i.hasAttribute('readonly')) i.value = 0;
    });
    document.getElementById('rate').value = 50000;
    calculate();
}

// اجرا در بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    calculate();

    // لینک دکمه‌ها
    document.querySelector('button[onclick="calculate()"]').addEventListener('click', calculate);
    document.querySelector('button[onclick="resetForm()"]').addEventListener('click', resetForm);
});
