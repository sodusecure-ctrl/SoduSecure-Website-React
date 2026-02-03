"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ForgetPassword() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);
  const t = useTranslations('auth.forgotPassword');
  const router = useRouter();

  const validateEmail = (value: string): string => {
    if (value.trim() === '') {
      return t('validation.emailRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return t('validation.emailInvalid');
    }

    return '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      const validationError = validateEmail(value);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);
  };

  const handleNext = () => {
    setTouched(true);
    const validationError = validateEmail(email);
    setError(validationError);

    if (!validationError) {
      console.log('Password reset requested for:', email);
      router.push("/auth/forgot-password/verify-email");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleNext();
      e.preventDefault();
      router.push("/auth/forgot-password/verify-email");
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

          <h1 className="text-3xl font-bold text-center mb-3 text-gray-900">
            {t('title')}
          </h1>

          <p className="text-center text-gray-500 text-sm mb-12">
            {t('subtitle')}
          </p>

          <div className="space-y-6" onKeyPress={handleKeyPress}>
            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-sm text-gray-600">
                {t('emailLabel')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t('emailPlaceholder')}
                className={`mt-1 ${error && touched ? 'border-red-500' : ''}`}
              />
              {error && touched && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
            </div>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-6 rounded-lg transition-colors"
            >
              {t('nextButton')} <ArrowRight className="ml-2" size={20} />
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
