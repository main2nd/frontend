// API请求封装

// 后端API基础URL
// 请根据实际后端服务器地址和端口进行修改
const API_BASE_URL = 'http://localhost:8080';

// 获取Authorization头
function getAuthHeader() {
    const token = localStorage.getItem('token');
    console.log('获取Authorization头，token:', token);
    if (!token) {
        console.error('未找到token，请重新登录');
        // 确保返回空对象，不影响请求发送
        return {};
    }
    // 检查token是否有效（不为空且格式正确）
    if (token.trim() === '') {
        console.error('token为空，请重新登录');
        return {};
    }
    console.log('添加Authorization头:', { 'Authorization': token });
    return { 'Authorization': token };
}

// 添加axios请求拦截器，自动为所有请求添加Authorization头
axios.interceptors.request.use(
    function(config) {
        // 获取Authorization头
        const authHeader = getAuthHeader();
        // 如果有Authorization头，添加到请求配置中
        if (authHeader.Authorization) {
            config.headers = {
                ...config.headers,
                ...authHeader
            };
        }
        console.log('请求配置:', config);
        return config;
    },
    function(error) {
        // 处理请求错误
        console.error('请求配置错误:', error);
        return Promise.reject(error);
    }
);

// 处理API响应
function handleResponse(response) {
    console.log('API响应状态:', response.status);
    console.log('API响应数据:', response.data);
    if (response.status === 401) {
        // 未授权，清除token并跳转到登录页面
        console.error('401未授权，清除token并跳转到登录页面');
        localStorage.removeItem('token');
        window.location.href = './login.html';
        throw new Error('未授权，请重新登录');
    }
    return response.data;
}

// 处理API错误
function handleError(error) {
    console.error('API请求错误:', error);
    if (error.response) {
        // 服务器返回错误状态码
        return Promise.reject(error.response.data);
    } else if (error.request) {
        // 请求已发送但没有收到响应
        return Promise.reject({ code: 1, message: '网络错误，请检查您的网络连接' });
    } else {
        // 请求配置出错
        return Promise.reject({ code: 1, message: '请求错误，请稍后重试' });
    }
}

// 用户注册
function register(accountName, password) {
    return axios.post(`${API_BASE_URL}/user/register`, null, {
        params: { accountName, password }
    })
    .then(handleResponse)
    .catch(handleError);
}

// 用户登录
function login(accountName, password) {
    return axios.post(`${API_BASE_URL}/user/login`, null, {
        params: { accountName, password }
    })
    .then(handleResponse)
    .catch(handleError);
}

// 获取用户信息
function userInfo() {
    return axios.get(`${API_BASE_URL}/user/userInfo`)
    .then(handleResponse)
    .catch(handleError);
}

// 更新用户信息
function updateUserInfo(user) {
    return axios.put(`${API_BASE_URL}/user/update`, user)
    .then(handleResponse)
    .catch(handleError);
}

// 修改密码
function updatePassword(params) {
    return axios.patch(`${API_BASE_URL}/user/updatePwd`, params)
    .then(handleResponse)
    .catch(handleError);
}

// 添加分类
function addCategory(category) {
    return axios.post(`${API_BASE_URL}/Category/addCategory`, category)
    .then(handleResponse)
    .catch(handleError);
}

// 获取分类列表
function getCategories() {
    return axios.get(`${API_BASE_URL}/Category/list`)
    .then(handleResponse)
    .catch(handleError);
}

// 获取分类详情
function getCategoryDetail(id) {
    return axios.get(`${API_BASE_URL}/Category/detail`, {
        params: { id }
    })
    .then(handleResponse)
    .catch(handleError);
}

// 更新分类
function updateCategory(category) {
    return axios.put(`${API_BASE_URL}/Category/update`, category)
    .then(handleResponse)
    .catch(handleError);
}

// 删除分类
function deleteCategoryById(id) {
    return axios.delete(`${API_BASE_URL}/Category/delete`, {
        params: { id }
    })
    .then(handleResponse)
    .catch(handleError);
}

// 文件上传
function uploadFile(formData) {
    return axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(handleResponse)
    .catch(handleError);
}

// 获取文章列表
function getArticles() {
    return axios.get(`${API_BASE_URL}/article/list`)
    .then(handleResponse)
    .catch(handleError);
}

// 导出所有API函数
window.register = register;
window.login = login;
window.userInfo = userInfo;
window.updateUserInfo = updateUserInfo;
window.updatePassword = updatePassword;
window.addCategory = addCategory;
window.getCategories = getCategories;
window.getCategoryDetail = getCategoryDetail;
window.updateCategory = updateCategory;
window.deleteCategoryById = deleteCategoryById;
window.uploadFile = uploadFile;
window.getArticles = getArticles;