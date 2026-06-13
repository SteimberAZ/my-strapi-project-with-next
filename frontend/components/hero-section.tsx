import { STRAPI_BASE_URL } from '@/lib/strapi';
import Link from 'next/link';

export default function HeroSection({ data }: { data: any }) {
    const imageURL= data.imagen?.url.startsWith('http') ? data.imagen?.url : `${STRAPI_BASE_URL}${data.imagen.url}`;
    return (
        <div className="py-12 flex mt-6 bg-black justify-center items-center flex-col">
            {/* 1. heading funciona directo */}
            <h2 className="text-white font-bold mb-2 text-3xl">{data?.heading}</h2>
            
            {/* 2. En Strapi viene como subHeading (con H mayúscula) */}
            <p className="text-white my-2">{data?.subHeading}</p>
            
            {/* 3. Validamos que exista data.link.href antes de renderizar el <Link> */}
            {data?.link?.href ? (
                <Link 
                    href={data.link.href} 
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                    {data.link.Label} {/* Ojo: 'Label' va con L mayúscula en tu JSON */}
                </Link>
            ) : null}
            
            {/* 4. En Strapi viene como 'imagen' (en español) */}
            {data?.imagen?.url && (
                <div className="mt-4">
                    <img 
                        src={imageURL} 
                        alt={data.imagen.alternativeText || data.heading || "Hero Image"} 
                        className="max-w-xs h-auto"
                    />
                </div>
            )}
        </div>
    );
}