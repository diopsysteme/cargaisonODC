export function showNotification(message, type) {
    var _a;
    const container = document.getElementById('notificationContainer');
    if (container) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <span class="close">&times;</span>
        `;
        container.appendChild(notification);
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        // Add close event
        (_a = notification.querySelector('.close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            hideNotification(notification);
        });
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 3000);
    }
}
export function hideNotification(notification) {
    notification.classList.add('fade-out');
    notification.addEventListener('animationend', () => {
        notification.remove();
    });
}
export function showError(message) {
    var _a;
    const container = document.getElementById('notificationContainer');
    if (container) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <span>${message}</span>
            <span class="close">&times;</span>
        `;
        container.appendChild(errorMessage);
        // Show error message
        setTimeout(() => {
            errorMessage.classList.add('show');
        }, 10);
        // Add close event
        (_a = errorMessage.querySelector('.close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            hideNotification(errorMessage);
        });
        // Auto-hide error message after 5 seconds
        setTimeout(() => {
            hideNotification(errorMessage);
        }, 5000);
    }
}
