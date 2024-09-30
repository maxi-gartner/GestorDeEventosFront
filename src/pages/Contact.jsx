import { FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-page container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-4">
        Welcome to our Contact Page! Please feel free to reach out with any
        questions or feedback. Note that this is a sample page and not a real
        company.
      </p>

      <form className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="border rounded p-2 w-full"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border rounded p-2 w-full"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            className="border rounded p-2 w-full"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>

      <div className="social-links mb-6 p-4">
        <h2 className="text-2xl font-semibold mb-2 text-white">Follow Us</h2>
        <ul className="list-none">
          <li className="mb-2 flex items-center">
            <i className="text-white mr-2">
              <FaEnvelope />
            </i>
            <a
              href="mailto:your-email@example.com"
              className="text-white hover:underline transition duration-300"
            >
              Email Us
            </a>
          </li>
          <li className="mb-2 flex items-center">
            <i className="text-white mr-2">
              <FaInstagram />
            </i>
            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline transition duration-300"
            >
              GitHub
            </a>
          </li>
          <li className="flex items-center">
            <i className="text-white mr-2">
              <FaGithub />
            </i>
            <a
              href="https://instagram.com/your-instagram-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline transition duration-300"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
