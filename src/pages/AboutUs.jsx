import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import {
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiLaravel,
  SiBootstrap,
  SiFirebase,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { FaPhp, FaGit } from "react-icons/fa";

import { useState } from "react";

const AboutUs = () => {
  const [EnglishVersion, setEnglishVersion] = useState(false);

  return (
    <div>
      {!EnglishVersion ? (
        <div className="about-me-container p-6 min-h-screen text-gray-100">
          <header className="text-center mb-12">
            <h1 className="text-2xl sm:text-4xl font-bold">
              Maxi Gartner - Full Stack Developer
            </h1>
            <div className="flex w-full flex-col sm:flex-row justify-center items-center sm:gap-6">
              <h3 className="mt-4 text-xl sm:text-2xl font-bold sm:border-r-2 sm:border-white sm:pr-6">
                Aplicación: Gestor de Eventos
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
                onClick={() => setEnglishVersion(!EnglishVersion)}
              >
                Change to English version
              </button>
            </div>
          </header>

          <section className="about mb-12">
            <h2 className="text-2xl font-semibold mb-4">Sobre mí</h2>
            <p className="text-lg">
              ¡Hola! Soy Maximiliano Gartner, un{" "}
              <strong>Desarrollador Web Full Stack</strong> con experiencia en
              múltiples tecnologías tanto de front-end como de back-end. Me
              especializo en crear aplicaciones potentes y eficientes que
              faciliten la vida de las personas.
            </p>
          </section>

          <section className="project mb-12">
            <h2 className="text-2xl font-semibold mb-4">Lo que hice</h2>
            <p className="text-lg">
              Desarrollé la aplicación <strong>EventHub</strong>, diseñada para:
            </p>
            <ul className="list-disc list-inside">
              <li>
                Optimizar y automatizar la gestión de eventos de manera
                integral.
              </li>
              <li>Administrar eventos, lugares y usuarios con facilidad.</li>
              <li>
                Contar con un sistema de roles que incluye administradores,
                organizadores y usuarios regulares.
              </li>
              <li>
                Permitir a los usuarios inscribirse en eventos, dejar
                valoraciones y comentarios, siempre que estén registrados.
              </li>
              <li>
                Fomentar la interacción y el feedback entre los participantes
                para mejorar la experiencia.
              </li>
              <li>
                Incorporar muchas otras funcionalidades que facilitan la
                organización y el seguimiento de los eventos.
              </li>
            </ul>
            <p className="text-lg">
              Todo esto hace que el proceso sea más simple y eficiente.
            </p>
          </section>

          <section className="technologies mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Tecnologías Utilizadas
            </h2>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 text-center">
              <li className="flex flex-col items-center">
                <FaReact size={50} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">React</span>
              </li>
              <li className="flex flex-col items-center">
                <FaNodeJs size={50} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">Node.js</span>
              </li>
              <li className="flex flex-col items-center">
                <SiExpress size={50} className=" mb-2" />
                <span className="text-lg font-semibold ">Express</span>
              </li>
              <li className="flex flex-col items-center">
                <SiMongodb size={50} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">MongoDB</span>
              </li>
              <li className="flex flex-col items-center">
                <SiTailwindcss size={50} className="text-blue-400 mb-2" />
                <span className="text-lg font-semibold ">Tailwind CSS</span>
              </li>
            </ul>
          </section>

          <section className="why-choose-me mb-12">
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirme?</h2>
            <p className="text-lg">
              Tengo pasión por el desarrollo web y me encanta crear soluciones
              que realmente impacten. Soy una persona adaptable, con experiencia
              trabajando tanto solo como en equipo, y siempre dispuesto a
              aprender nuevas tecnologías para seguir mejorando. Además, manejo
              un amplio conjunto de tecnologías, incluyendo:
            </p>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 text-center mt-4">
              <li className="flex flex-col items-center">
                <FaReact size={30} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">React</span>
              </li>
              <li className="flex flex-col items-center">
                <FaNodeJs size={30} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">Node.js</span>
              </li>
              <li className="flex flex-col items-center">
                <SiExpress size={30} className="mb-2" />
                <span className="text-lg font-semibold">Express</span>
              </li>
              <li className="flex flex-col items-center">
                <SiMongodb size={30} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">MongoDB</span>
              </li>
              <li className="flex flex-col items-center">
                <FaPhp size={30} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">PHP</span>
              </li>
              <li className="flex flex-col items-center">
                <SiLaravel size={30} className="text-red-600 mb-2" />
                <span className="text-lg font-semibold">Laravel</span>
              </li>
              <li className="flex flex-col items-center">
                <FaDatabase size={30} className="text-blue-600 mb-2" />
                <span className="text-lg font-semibold">SQL Server</span>
              </li>
              <li className="flex flex-col items-center">
                <SiBootstrap size={30} className="text-purple-600 mb-2" />
                <span className="text-lg font-semibold">Bootstrap</span>
              </li>
              <li className="flex flex-col items-center">
                <SiTailwindcss size={30} className="text-blue-400 mb-2" />
                <span className="text-lg font-semibold">Tailwind CSS</span>
              </li>
              <li className="flex flex-col items-center">
                <SiFirebase size={30} className="text-yellow-500 mb-2" />
                <span className="text-lg font-semibold">Firebase</span>
              </li>
              <li className="flex flex-col items-center">
                <SiHtml5 size={30} className="text-orange-600 mb-2" />
                <span className="text-lg font-semibold">HTML</span>
              </li>
              <li className="flex flex-col items-center">
                <SiCss3 size={30} className="text-blue-600 mb-2" />
                <span className="text-lg font-semibold">CSS</span>
              </li>
              <li className="flex flex-col items-center">
                <FaGit size={30} className="text-orange-500 mb-2" />
                <span className="text-lg font-semibold">Git y GitHub</span>
              </li>
            </ul>
            <ul className="mt-4 space-y-2">
              <li>
                • Adaptabilidad: Rápido para aprender nuevas tecnologías y
                adaptarme a diferentes proyectos.
              </li>
              <li>
                • Comunicación: Fomento la colaboración y siempre estoy alineado
                con el equipo.
              </li>
              <li>
                • Organización: Detallista, metódico y busco optimizar procesos
                para entregar proyectos de calidad.
              </li>
            </ul>
          </section>

          <section className="contact text-center">
            <h2 className="text-2xl font-semibold mb-4">¿Querés saber más?</h2>
            <p className="text-lg">
              Si te interesa conocer más sobre mí y lo que puedo aportar a tu
              equipo, no dudes en contactarme.
            </p>
            <div className="mt-6">
              <p className="text-lg font-semibold">Maximiliano Gartner</p>
              <p className="">Crespo, Entre Ríos, Argentina</p>
              <p className="">maxi.gartner@hotmail.com</p>
              <p className="">+54 3435329910</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="about-me-container p-6 min-h-screen text-gray-100">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold">
              Maxi Gartner - Full Stack Developer
            </h1>
            <div className="flex w-full flex-col sm:flex-row justify-center items-center sm:gap-6">
              <h3 className="mt-4 text-xl sm:text-2xl font-bold sm:border-r-2 sm:border-white sm:pr-6">
                Application: Event Manager
              </h3>
              <button
                className="mt-4 px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-200"
                onClick={() => setEnglishVersion(!EnglishVersion)}
              >
                Cambiar a la versión en español
              </button>
            </div>
          </header>

          <section className="about mb-12">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-lg">
              Hello! I&apos;m Maximiliano Gartner, a{" "}
              <strong>Full Stack Web Developer</strong> with experience in
              multiple front-end and back-end technologies. I specialize in
              creating powerful and efficient applications that make
              people&apos;s lives easier.
            </p>
          </section>

          <section className="project mb-12">
            <h2 className="text-2xl font-semibold mb-4">What I Did</h2>
            <p className="text-lg">
              I developed the <strong>EventHub</strong> application, designed
              to:
            </p>
            <ul className="list-disc list-inside">
              <li>Optimize and automate event management comprehensively.</li>
              <li>Manage events, venues, and users easily.</li>
              <li>
                Include a role system that features administrators, organizers,
                and regular users.
              </li>
              <li>
                Allow users to register for events, leave ratings and comments,
                as long as they are registered.
              </li>
              <li>
                Encourage interaction and feedback among participants to enhance
                the experience.
              </li>
              <li>
                Incorporate many other features that facilitate event
                organization and tracking.
              </li>
            </ul>
            <p className="text-lg">
              All of this makes the process simpler and more efficient.
            </p>
          </section>

          <section className="technologies mb-12">
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 text-center">
              <li className="flex flex-col items-center">
                <FaReact size={50} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">React</span>
              </li>
              <li className="flex flex-col items-center">
                <FaNodeJs size={50} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">Node.js</span>
              </li>
              <li className="flex flex-col items-center">
                <SiExpress size={50} className="mb-2" />
                <span className="text-lg font-semibold">Express</span>
              </li>
              <li className="flex flex-col items-center">
                <SiMongodb size={50} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">MongoDB</span>
              </li>
              <li className="flex flex-col items-center">
                <SiTailwindcss size={50} className="text-blue-400 mb-2" />
                <span className="text-lg font-semibold">Tailwind CSS</span>
              </li>
            </ul>
          </section>

          <section className="why-choose-me mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Me?</h2>
            <p className="text-lg">
              I have a passion for web development and love creating solutions
              that truly make an impact. I am an adaptable person with
              experience working both independently and in teams, always willing
              to learn new technologies to keep improving. Additionally, I
              handle a wide array of technologies, including:
            </p>
            <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 text-center mt-4">
              <li className="flex flex-col items-center">
                <FaReact size={30} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">React</span>
              </li>
              <li className="flex flex-col items-center">
                <FaNodeJs size={30} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">Node.js</span>
              </li>
              <li className="flex flex-col items-center">
                <SiExpress size={30} className="mb-2" />
                <span className="text-lg font-semibold">Express</span>
              </li>
              <li className="flex flex-col items-center">
                <SiMongodb size={30} className="text-green-500 mb-2" />
                <span className="text-lg font-semibold">MongoDB</span>
              </li>
              <li className="flex flex-col items-center">
                <FaPhp size={30} className="text-blue-500 mb-2" />
                <span className="text-lg font-semibold">PHP</span>
              </li>
              <li className="flex flex-col items-center">
                <SiLaravel size={30} className="text-red-600 mb-2" />
                <span className="text-lg font-semibold">Laravel</span>
              </li>
              <li className="flex flex-col items-center">
                <FaDatabase size={30} className="text-blue-600 mb-2" />
                <span className="text-lg font-semibold">SQL Server</span>
              </li>
              <li className="flex flex-col items-center">
                <SiBootstrap size={30} className="text-purple-600 mb-2" />
                <span className="text-lg font-semibold">Bootstrap</span>
              </li>
              <li className="flex flex-col items-center">
                <SiTailwindcss size={30} className="text-blue-400 mb-2" />
                <span className="text-lg font-semibold">Tailwind CSS</span>
              </li>
              <li className="flex flex-col items-center">
                <SiFirebase size={30} className="text-yellow-500 mb-2" />
                <span className="text-lg font-semibold">Firebase</span>
              </li>
              <li className="flex flex-col items-center">
                <SiHtml5 size={30} className="text-orange-600 mb-2" />
                <span className="text-lg font-semibold">HTML</span>
              </li>
              <li className="flex flex-col items-center">
                <SiCss3 size={30} className="text-blue-600 mb-2" />
                <span className="text-lg font-semibold">CSS</span>
              </li>
              <li className="flex flex-col items-center">
                <FaGit size={30} className="text-orange-500 mb-2" />
                <span className="text-lg font-semibold">Git and GitHub</span>
              </li>
            </ul>
            <ul className="mt-4 space-y-2">
              <li>
                • Adaptability: Quick to learn new technologies and adapt to
                different projects.
              </li>
              <li>
                • Communication: I promote collaboration and always stay aligned
                with the team.
              </li>
              <li>
                • Organization: Detail-oriented, methodical, and seek to
                optimize processes to deliver quality projects.
              </li>
            </ul>
          </section>

          <section className="contact text-center">
            <h2 className="text-2xl font-semibold mb-4">Want to Know More?</h2>
            <p className="text-lg">
              If you&apos;re interested in learning more about me and what I can
              bring to your team, feel free to contact me.
            </p>
            <div className="mt-6">
              <p className="text-lg font-semibold">Maximiliano Gartner</p>
              <p className="">Crespo, Entre Ríos, Argentina</p>
              <p className="">maxi.gartner@hotmail.com</p>
              <p className="">+54 3435329910</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
