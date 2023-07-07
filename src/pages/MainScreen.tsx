import { useEffect, useRef } from "react"
import { NavBar } from "../components/NavBar"
import { ObjectForm } from "../components/ObjectForm"
import { ObjectList } from "../components/ObjectList"
import { PropertiesFrom } from "../components/PropertiesFrom"
import { PropertiesList } from "../components/PropertiesList"
import { TypeForm } from "../components/TypeForm"
import { TypesList } from "../components/TypesList"
import { useGlobalState } from "../utility/hooks/useGlobalState"
import { ScrollTopButton } from "../components/ScrollTopButton"

export const MainScreen = () => {
  const { getData } = useGlobalState();
  const topRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const sectionRefs = {
      typesRef,
      propertiesRef,
      objectsRef,
      topRef
    }
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    getData();
  }, [])
  
  return (
    <div ref={topRef}>
      <header>
        <NavBar scrollToSection={scrollToSection} />
      </header>
      <main className="mx-6 py-8 mt-8 md:container md:mx-auto lg:mt-20">
        <div className="flex flex-col gap-8 max-w-screen-md mx-auto">
          <div ref={typesRef} className="bg-slate-50 border border-slate-300 rounded-md p-5 flex flex-col gap-12">
            <TypeForm />
            <TypesList />
          </div>
          <div ref={propertiesRef} className="bg-slate-50 border border-slate-300 rounded-md p-5 flex flex-col gap-12">
            <PropertiesFrom />
            <PropertiesList />
          </div>
          <div ref={objectsRef} className="bg-slate-50 border border-slate-300 rounded-md p-5 flex flex-col gap-12">
            <ObjectForm />
            <ObjectList />
          </div>
        </div>
      </main>
      {/* Scroll to top button */}
      <ScrollTopButton scrollToSection={scrollToSection} />
    </div>
  )
}