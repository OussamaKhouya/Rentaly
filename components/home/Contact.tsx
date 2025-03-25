"use client"
import Image from 'next/image';
import Link from "next/link";
import {useTranslations} from "use-intl";

const Contact = () => {
    const phoneNumber = "+212661991877";
    const email = "reservation@ylhca.ma";
    const address = "Bouchouk résidence annakhil 2, Salé";
    const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;
    const t = useTranslations('Contact');
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.401186963287!2d-6.792667484800293!3d34.04085822341532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76cf56d96f5c5b%3A0xbbeffcad32b1c0c4!2sYLH%20CAR!5e0!3m2!1sen!2sma!4v1702309460367!5m2!1sen!2sma";
    return (
        <section className='mt-16 flex flex-col md:flex-row items-center md:items-start gap-8 flex-between'>
            {/* Contact Information */}
            <div className='w-full md:w-1/3 space-y-6 flex-col'>
                <h2 className='text-[40px] font-serif font-bold  dark:text-white'>{t("Contact_us")}</h2>

                <p className='text-[22px] leading-[26px] font-bold  padding-y top-14  dark:text-white'>{t("come_to_us")}</p>

                <div className='flex items-center space-x-3'>
                    <Image className="object-contain block dark:hidden" src='/phone-icon.png' width={20} height={20} alt='Phone'/>
                    <Image  className="object-contain hidden dark:block" src='/phone-dark-icon.png' width={20} height={20} alt='Phone'/>
                    <p className='text-[22px] leading-[26px]  dark:text-white'>
                        06 61 39 71 47 <span className="font-bold">/</span> 07 65 57 59 58
                    </p>
                </div>

                <div className='flex items-center space-x-3'>
                    <Image className="object-contain block dark:hidden" src='/email-icon.png' width={20} height={20} alt='Email'/>
                    <Image  className="object-contain hidden dark:block" src='/email-dark-icon.png' width={20} height={20} alt='Email'/>
                    <p className='text-[22px] leading-[26px]  dark:text-white'>
                        reservation@ylhcar.ma
                    </p>

                </div>

                <div className='flex items-center space-x-3'>
                    <Image className="object-contain block dark:hidden" src='/location-icon4.svg' width={20} height={20} alt='Location'/>
                    <Image  className="object-contain hidden dark:block" src='/location-dark-icon.png' width={20} height={20} alt='Location'/>

                    <p className='text-[22px] leading-[26px]  dark:text-white '>
                        23 guich oudaya, Rabat, Morocco
                    </p>
                </div>

            </div>
            {/* Map Container */}
            <div className="relative w-full aspect-[16/9]">
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded"
                    frameBorder="0"
                    scrolling="no"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.221278369778!2d-6.8975326!3d33.939486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda712dd69bf9789%3A0x13d2320aa8340258!2sGUICH%20OUDAYA%2C%20T%C3%A9mara!5e0!3m2!1sen!2sma!4v1702309460367!5m2!1sen!2sma"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>

    );
};
export default Contact;
