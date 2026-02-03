"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  newPassword?: boolean;
  confirmPassword?: boolean;
}

export default function CreateNewPassword() {
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: ''
  });

  const t = useTranslations('auth.createNewPassword');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [touched, setTouched] = useState<TouchedFields>({});
  const router = useRouter();

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'newPassword':
        if (value === '') return t('validation.passwordRequired');
        if (value.length < 8) return t('validation.passwordMinLength');
        if (!/(?=.*[a-z])/.test(value)) return t('validation.passwordLowercase');
        if (!/(?=.*[A-Z])/.test(value)) return t('validation.passwordUppercase');
        if (!/(?=.*\d)/.test(value)) return t('validation.passwordNumber');
        return '';
      case 'confirmPassword':
        if (value === '') return t('validation.confirmPasswordRequired');
        if (value !== formData.newPassword) return t('validation.passwordsDoNotMatch');
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    if (name === 'newPassword' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      newPassword: true,
      confirmPassword: true
    });

    if (Object.keys(newErrors).length === 0) {
      console.log('Password changed successfully');
      // alert('Your password has been changed successfully!');
      router.push('/auth/signin');

    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg shadow-sm border border-gray-100 sm:p-10 p-4 rounded-xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center">
              <Image src={"/icons/Logo.png"} alt='website logo' height={60} width={60} className='rounded-xl' />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">
            {t('title')}
          </h1>

          <p className="text-center text-gray-600 text-sm mb-8 leading-relaxed px-4">
            {t('description')}
          </p>

          <div className="space-y-5" onKeyPress={handleKeyPress}>
            {/* New Password */}
            <div>
              <Label htmlFor="newPassword" className="text-sm text-gray-600">
                {t('newPasswordLabel')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('newPasswordPlaceholder')}
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pr-10 ${errors.newPassword && touched.newPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && touched.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm text-gray-600">
                {t('confirmNewPasswordLabel')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('confirmNewPasswordPlaceholder')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Change Password Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-6 rounded-lg transition-colors"
            >
              {t('changePasswordButton')} <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
        <Image
          src="/images/auth/auth.jpg"
          alt="Charity donation jar"
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/images/blur-placeholder.jpg"
        />
      </div>
    </div>
  );
}
