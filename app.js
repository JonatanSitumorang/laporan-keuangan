// Data storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Chart instances
let categoryChart = null;
let monthlyChart = null;

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', () => {
    setTodayDate();
    renderExpenseList();
    updateSummary();
    updateCharts();
    updateCategoryStats();
    
    // Event listeners
    document.getElementById('expenseForm').addEventListener('submit', addExpense);
    document.getElementById('filterMonth').addEventListener('change', renderExpenseList);
});

// Set tanggal hari ini sebagai default
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

// Tambah pengeluaran baru
function addExpense(e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!date || !category || !amount) {
        alert('Silakan lengkapi semua field yang diperlukan!');
        return;
    }

    const expense = {
        id: Date.now(),
        date,
        category,
        description: description || '-',
        amount
    };

    expenses.push(expense);
    saveExpenses();
    
    // Reset form
    document.getElementById('expenseForm').reset();
    setTodayDate();
    
    // Update tampilan
    renderExpenseList();
    updateSummary();
    updateCharts();
    updateCategoryStats();
    
    showNotification('Pengeluaran berhasil ditambahkan!');
}

// Hapus pengeluaran
function deleteExpense(id) {
    if (confirm('Yakin ingin menghapus pengeluaran ini?')) {
        expenses = expenses.filter(exp => exp.id !== id);
        saveExpenses();
        renderExpenseList();
        updateSummary();
        updateCharts();
        updateCategoryStats();
        showNotification('Pengeluaran berhasil dihapus!');
    }
}

// Simpan ke localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Render daftar pengeluaran
function renderExpenseList() {
    const filterMonth = document.getElementById('filterMonth').value;
    const expenseList = document.getElementById('expenseList');
    
    let filteredExpenses = expenses;
    if (filterMonth) {
        filteredExpenses = expenses.filter(exp => exp.date.startsWith(filterMonth));
    } else {
        // Default: tampilkan bulan ini
        const today = new Date();
        const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        filteredExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
    }

    // Sort by date descending
    filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = '<p class="no-data">Belum ada pengeluaran</p>';
        return;
    }

    expenseList.innerHTML = filteredExpenses.map(exp => `
        <div class="expense-item">
            <div class="expense-info">
                <div class="expense-category">${getCategoryEmoji(exp.category)} ${getCategoryName(exp.category)}</div>
                <div class="expense-description">${exp.description}</div>
                <div class="expense-date">${formatDate(exp.date)}</div>
            </div>
            <div class="expense-amount">Rp ${formatCurrency(exp.amount)}</div>
            <button class="btn-delete" onclick="deleteExpense(${exp.id})">Hapus</button>
        </div>
    `).join('');
}

// Reset filter
function resetFilter() {
    document.getElementById('filterMonth').value = '';
    renderExpenseList();
}

// Update ringkasan statistik
function updateSummary() {
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const currentMonthExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
    
    if (currentMonthExpenses.length === 0) {
        document.getElementById('totalExpense').textContent = 'Rp 0';
        document.getElementById('avgPerDay').textContent = 'Rp 0';
        document.getElementById('maxExpense').textContent = 'Rp 0';
        document.getElementById('transactionCount').textContent = '0';
        return;
    }

    const total = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const maxExpense = Math.max(...currentMonthExpenses.map(exp => exp.amount));
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const avgPerDay = total / daysInMonth;

    document.getElementById('totalExpense').textContent = `Rp ${formatCurrency(total)}`;
    document.getElementById('avgPerDay').textContent = `Rp ${formatCurrency(avgPerDay)}`;
    document.getElementById('maxExpense').textContent = `Rp ${formatCurrency(maxExpense)}`;
    document.getElementById('transactionCount').textContent = currentMonthExpenses.length;
}

// Update grafik
function updateCharts() {
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    const currentMonthExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));

    // Grafik Kategori
    updateCategoryChart(currentMonthExpenses);

    // Grafik Bulanan
    updateMonthlyChart();
}

// Update grafik pengeluaran per kategori
function updateCategoryChart(monthExpenses) {
    const categoryData = {};
    const categories = ['makanan', 'transport', 'kebutuhan', 'hiburan', 'kesehatan', 'lainnya'];
    
    categories.forEach(cat => {
        categoryData[cat] = monthExpenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => sum + exp.amount, 0);
    });

    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    if (categoryChart) {
        categoryChart.destroy();
    }

    const colors = ['#FF6B6B', '#FFA500', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories.map(cat => getCategoryName(cat)),
            datasets: [{
                data: categories.map(cat => categoryData[cat]),
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            devicePixelRatio: window.devicePixelRatio || 1,
            plugins: {
                legend: {
                    position: window.innerWidth < 768 ? 'bottom' : 'bottom',
                    labels: {
                        font: { size: window.innerWidth < 480 ? 10 : 12 },
                        padding: window.innerWidth < 480 ? 8 : 15,
                        usePointStyle: true,
                        boxPadding: window.innerWidth < 480 ? 3 : 5
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: window.innerWidth < 480 ? 11 : 12 },
                    bodyFont: { size: window.innerWidth < 480 ? 10 : 11 },
                    padding: window.innerWidth < 480 ? 8 : 10,
                    callbacks: {
                        label: function(context) {
                            return 'Rp ' + formatCurrency(context.parsed);
                        }
                    }
                }
            }
        }
    });
}

// Update grafik tren bulanan
function updateMonthlyChart() {
    // Ambil 12 bulan terakhir
    const months = [];
    const monthlyTotals = [];
    
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleString('id-ID', { month: 'short', year: 'numeric' });
        
        months.push(monthName);
        
        const total = expenses
            .filter(exp => exp.date.startsWith(monthStr))
            .reduce((sum, exp) => sum + exp.amount, 0);
        
        monthlyTotals.push(total);
    }

    const ctx = document.getElementById('monthlyChart').getContext('2d');
    
    if (monthlyChart) {
        monthlyChart.destroy();
    }

    monthlyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Total Pengeluaran (Rp)',
                data: monthlyTotals,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: window.innerWidth < 480 ? 3 : 5,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: window.innerWidth < 480 ? 5 : 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            devicePixelRatio: window.devicePixelRatio || 1,
            plugins: {
                legend: {
                    display: true,
                    labels: { 
                        font: { size: window.innerWidth < 480 ? 10 : 12 }
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: window.innerWidth < 480 ? 10 : 12 },
                    bodyFont: { size: window.innerWidth < 480 ? 9 : 11 },
                    padding: window.innerWidth < 480 ? 6 : 10,
                    callbacks: {
                        label: function(context) {
                            return 'Rp ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: { size: window.innerWidth < 480 ? 9 : 11 },
                        callback: function(value) {
                            return 'Rp ' + formatCurrency(value);
                        }
                    }
                },
                x: {
                    ticks: {
                        font: { size: window.innerWidth < 480 ? 8 : 10 }
                    }
                }
            }
        }
    });
}

// Update statistik per kategori (rata-rata bulanan)
function updateCategoryStats() {
    if (expenses.length === 0) {
        document.getElementById('categoryStats').innerHTML = '<p class="no-data">Belum ada data pengeluaran</p>';
        return;
    }

    // Hitung rata-rata per kategori per bulan
    const categories = ['makanan', 'transport', 'kebutuhan', 'hiburan', 'kesehatan', 'lainnya'];
    const monthMap = {};

    // Kelompokkan pengeluaran per bulan
    expenses.forEach(exp => {
        const month = exp.date.substring(0, 7);
        if (!monthMap[month]) {
            monthMap[month] = {};
            categories.forEach(cat => {
                monthMap[month][cat] = 0;
            });
        }
        monthMap[month][exp.category] = (monthMap[month][exp.category] || 0) + exp.amount;
    });

    // Hitung rata-rata per kategori
    const monthCount = Object.keys(monthMap).length;
    const categoryAverages = {};
    
    categories.forEach(cat => {
        const total = Object.values(monthMap).reduce((sum, month) => sum + (month[cat] || 0), 0);
        categoryAverages[cat] = monthCount > 0 ? total / monthCount : 0;
    });

    const html = categories
        .filter(cat => categoryAverages[cat] > 0)
        .map(cat => `
            <div class="stat-card">
                <div class="stat-category">${getCategoryEmoji(cat)} ${getCategoryName(cat)}</div>
                <div class="stat-info">
                    <div><strong>Rata-rata/Bulan:</strong> Rp ${formatCurrency(categoryAverages[cat])}</div>
                    <div><strong>Total:</strong> Rp ${formatCurrency(Object.values(monthMap).reduce((sum, month) => sum + (month[cat] || 0), 0))}</div>
                    <div><strong>Transaksi:</strong> ${expenses.filter(exp => exp.category === cat).length}</div>
                </div>
            </div>
        `)
        .join('');

    document.getElementById('categoryStats').innerHTML = html || '<p class="no-data">Belum ada data pengeluaran</p>';
}

// Hapus semua data
function clearAllData() {
    if (confirm('Yakin ingin menghapus SEMUA data pengeluaran? Tindakan ini tidak dapat dibatalkan!')) {
        expenses = [];
        saveExpenses();
        renderExpenseList();
        updateSummary();
        updateCharts();
        updateCategoryStats();
        showNotification('Semua data berhasil dihapus!');
    }
}

// Helper functions
function formatCurrency(num) {
    return new Intl.NumberFormat('id-ID').format(Math.round(num));
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('id-ID', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function getCategoryName(category) {
    const names = {
        'makanan': 'Makanan',
        'transport': 'Transport',
        'kebutuhan': 'Kebutuhan',
        'hiburan': 'Hiburan',
        'kesehatan': 'Kesehatan',
        'lainnya': 'Lainnya'
    };
    return names[category] || category;
}

function getCategoryEmoji(category) {
    const emojis = {
        'makanan': '🍔',
        'transport': '🚗',
        'kebutuhan': '🛒',
        'hiburan': '🎮',
        'kesehatan': '🏥',
        'lainnya': '📌'
    };
    return emojis[category] || '📊';
}

function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Tambahkan animasi slideIn dan slideOut
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
