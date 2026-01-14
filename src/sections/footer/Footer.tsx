'use client';
import React from 'react';
import IconPhone  from "@/components/icons/icon-phone.svg";
import IconEmail from '@/components/icons/icon-email.svg';
import IconFb  from '@/components/icons/social-netwoks/icon-fb.svg';
import IconInsta from '@/components/icons/social-netwoks/icon-instagram.svg';

const socialIconStyles = `
  w-10 h-10 hover:fill-[hsl(224,93%,58%)]
  cursor-pointer dark:fill-white transition-all duration-300
  rounded-full border border-white hover:border-[hsl(224,93%,58%)] p-2
`;

const Footer: React.FC = () => {
  return (
    <footer className="relative pb-10 pt-2 m-0 w-full max-w-5xl md:pt-0">
      <div className="main-footer mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0 md:py-15 max-w-5xl">
        <div className="flex flex-col items-start">
          <span className="mb-6 flex flex-row gap-2 hover:text-[hsl(224,93%,58%)] cursor-pointer">
            <IconPhone className="w-6 h-4 fill-white hover:fill-[hsl(224,93%,58%)]" /> +593 978764482
          </span>
          <span className="flex flex-row gap-2 hover:text-[hsl(224,93%,58%)] cursor-pointer">
            <IconEmail className="w-6 h-4 fill-white hover:fill-[hsl(224,93%,58%)]" />
            informaciontecnologias2020@gmail.com
          </span>
        </div>

        <div className="flex flex-col gap-y-6 items-start md:items-start md:ml-20">
          <span className="hover:text-[hsl(224,93%,58%)] cursor-pointer">Sobre Nosotros</span>
          <span className="block hover:text-[hsl(224,93%,58%)] cursor-pointer">Blog</span>
        </div>

        <div className="flex justify-center space-x-4 md:justify-start">
          <a href="https://www.facebook.com/TIespochMorona" target="_blank" rel="noopener noreferrer">
            <IconFb className={socialIconStyles} />
          </a>
          <a href="https://www.instagram.com/tiespochmorona" target="_blank" rel="noopener noreferrer">
            <IconInsta className={socialIconStyles} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;