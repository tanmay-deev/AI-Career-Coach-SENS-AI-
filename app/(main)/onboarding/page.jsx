import { industries } from '@/data/industries';
import React from 'react'

const OnboardingPage = () => {
  return (
      <main>
          <OnBoardingForm industries={industries} />
      </main>
  )
}

export default OnboardingPage;