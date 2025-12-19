// 工具函数

// 日期格式化函数
function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// 本地存储操作
// 获取本地存储数据
function getLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('获取本地存储数据失败:', error);
        return null;
    }
}

// 设置本地存储数据
function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('设置本地存储数据失败:', error);
        return false;
    }
}

// 移除本地存储数据
function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('移除本地存储数据失败:', error);
        return false;
    }
}

// 清空本地存储数据
function clearLocalStorage() {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('清空本地存储数据失败:', error);
        return false;
    }
}

// 表单验证函数
// 验证用户名
function validateUsername(username) {
    const regex = /^\S{3,16}$/;
    return regex.test(username);
}

// 验证密码
function validatePassword(password) {
    const regex = /^\S{6,15}$/;
    return regex.test(password);
}

// 验证手机号
function validatePhone(phone) {
    const regex = /^1[3-9]\d{9}$/;
    return regex.test(phone);
}

// 验证邮箱
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 验证非空
function validateRequired(value) {
    return value !== undefined && value !== null && value.toString().trim() !== '';
}

// 字符串处理函数
// 截断字符串
function truncateString(str, maxLength, suffix = '...') {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength - suffix.length) + suffix;
}

// 格式化金额
function formatMoney(amount, decimalPlaces = 2) {
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
    }).format(amount);
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 随机生成字符串
function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 防抖函数
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 深拷贝对象
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

// 检查是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 获取URL参数
function getUrlParam(name) {
    const url = window.location.href;
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 导出所有工具函数
window.formatDate = formatDate;
window.getLocalStorage = getLocalStorage;
window.setLocalStorage = setLocalStorage;
window.removeLocalStorage = removeLocalStorage;
window.clearLocalStorage = clearLocalStorage;
window.validateUsername = validateUsername;
window.validatePassword = validatePassword;
window.validatePhone = validatePhone;
window.validateEmail = validateEmail;
window.validateRequired = validateRequired;
window.truncateString = truncateString;
window.formatMoney = formatMoney;
window.formatFileSize = formatFileSize;
window.generateRandomString = generateRandomString;
window.debounce = debounce;
window.throttle = throttle;
window.deepClone = deepClone;
window.isMobile = isMobile;
window.getUrlParam = getUrlParam;