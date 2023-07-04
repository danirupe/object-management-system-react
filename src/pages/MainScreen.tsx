import { useRef } from "react"
import { NavBar } from "../components/NavBar"
import { ObjectForm } from "../components/ObjectForm"
import { ObjectList } from "../components/ObjectList"
import { PropertiesFrom } from "../components/PropertiesFrom"
import { PropertiesList } from "../components/PropertiesList"
import { TypeForm } from "../components/TypeForm"
import { TypesList } from "../components/TypesList"

export const MainScreen = () => {
  const typesRef = useRef<HTMLDivElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<HTMLDivElement>(null);

  const scrollToTypes = () => {
    typesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToProperties = () => {
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToObjects = () => {
    objectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <header>
        <NavBar scrollToTypes={scrollToTypes} scrollToProperties={scrollToProperties} scrollToObjects={scrollToObjects} />
      </header>
      <main className="container mx-auto py-8">
        <div className="flex flex-col gap-8 max-w-screen-md mx-auto">
          <div ref={typesRef} className="bg-slate-50 border border-slate-300 rounded-md p-5">
            <TypeForm />
            <TypesList />
          </div>
          <div ref={propertiesRef} className="bg-slate-50 border border-slate-300 rounded-md p-5">
            <PropertiesFrom />
            <PropertiesList />
          </div>
          <div ref={objectsRef} className="bg-slate-50 border border-slate-300 rounded-md p-5">
            <ObjectForm />
            <ObjectList />
          </div>
        </div>
      </main>
    </>
  )
}