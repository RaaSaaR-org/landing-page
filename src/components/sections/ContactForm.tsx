'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Section } from '@/components/layout';
import { trackFormSubmission } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact');
  const tValidation = useTranslations('contact.validation');
  const [submitted, setSubmitted] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(1, tValidation('nameRequired')),
    email: z.string().email(tValidation('emailInvalid')),
    organization: z.string().optional(),
    orgType: z.string().optional(),
    message: z.string().min(10, tValidation('messageMin')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data:', data);
    trackFormSubmission('contact_form', 'raasaar_inquiry');
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Section id="contact" className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('subtitle')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white text-lg">{t('form.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    {t('form.name')} *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/30 transition-all"
                    placeholder={t('form.namePlaceholder')}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    {t('form.email')} *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/30 transition-all"
                    placeholder={t('form.emailPlaceholder')}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    {t('form.organization')}
                  </label>
                  <input
                    {...register('organization')}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/30 transition-all"
                    placeholder={t('form.organizationPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    {t('form.orgType')}
                  </label>
                  <select
                    {...register('orgType')}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/30 transition-all"
                  >
                    <option value="" className="bg-gray-900">{t('form.orgTypes.other')}</option>
                    <option value="industrial" className="bg-gray-900">{t('form.orgTypes.industrial')}</option>
                    <option value="municipal" className="bg-gray-900">{t('form.orgTypes.municipal')}</option>
                    <option value="research" className="bg-gray-900">{t('form.orgTypes.research')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3 text-white">
                    {t('form.message')} *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white/30 transition-all resize-none"
                    placeholder={t('form.messagePlaceholder')}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-2">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
