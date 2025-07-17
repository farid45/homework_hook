import { useState } from 'react';

const useForm = (onSubmit) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim() !== '' ? '' : 'Это поле обязательно для заполнения';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Введите корректный email';
      case 'password':
        if (value.length < 5) return 'Пароль должен содержать минимум 5 символов';
        if (!/[0-9]/.test(value)) return 'Пароль должен содержать цифры';
        if (!/[!@#$%^&*,./:;]/.test(value)) return 'Пароль должен содержать специальные символы';
        return '';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Пароли не совпадают';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Валидация при изменении
    const fieldError = validateField(name, value);
    if (fieldError) {
      setError(fieldError);
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка всех полей перед отправкой
    let isValid = true;
    const errors = {};
    
    for (const field in formData) {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        errors[field] = errorMsg;
        isValid = false;
      }
    }
    
    if (!isValid) {
      setError(Object.values(errors)[0] || 'Пожалуйста, заполните все поля корректно');
      return;
    }
    
    // Если все валидно, вызываем onSubmit и очищаем форму
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};

export default useForm;