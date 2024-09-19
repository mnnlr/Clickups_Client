import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const getTailwindTheme = () => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const ToastConfig = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: getTailwindTheme(),  // Call the function here
    transition: Bounce,
};

const ToastProvider = ({ children }) => (
    <>
        <ToastContainer {...ToastConfig} />
        {children}
    </>
);

const showToast = (message, type = 'info') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'info':
            toast.info(message);
            break;
        default:
            toast(message);
    }
};

export { ToastProvider, showToast };
