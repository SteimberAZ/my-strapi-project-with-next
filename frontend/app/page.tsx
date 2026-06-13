import { getHomePage } from "@/lib/strapi";
import HeroSection from "@/components/hero-section";
import { Suspense } from "react";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  const {title, description} = strapiData?.data || {};
  return {
    title,
    description,
  }
}

async function HomeContent() {
  const strapiData = await getHomePage();

  console.log({ strapiData });

  // 1. Los datos reales viven dentro de strapiData.data
  const { title, description, sections } = strapiData?.data || {};
  
  // 2. Extraemos la primera sección usando el nombre correcto en plural: 'sections'
  const [heroSection] = sections || [];
  
  return heroSection ? <HeroSection data={heroSection} /> : null;
}

export default function Home() {
    return (
        <main className="container mx-auto py-6 font-mono">
            <Suspense fallback={<div className="text-white text-center py-10">Cargando...</div>}>
                <HomeContent />
            </Suspense>
        </main>
    );
}