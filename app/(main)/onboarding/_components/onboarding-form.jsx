"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from '@/app/lib/schema';

const OnBoardingForm = ({ industries }) => {

  const { register, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
    resolver: zodResolver(onboardingSchema),
  })

  return (
    <div>OnBoardingForm</div>
  )
}

export default OnBoardingForm