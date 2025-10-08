import { industries } from '@/data/industries';
import React from 'react'
import OnBoardingForm from './_components/onboarding-form';

const OnboardingPage = () => {
    return (
        <main>
            <OnBoardingForm industries={industries} />
        </main>
    );
}

export default OnboardingPage;