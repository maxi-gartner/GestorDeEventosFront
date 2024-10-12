import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Information</h5>
            <ul className="list-none mt-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">Contact</h5>
            <p className="text-gray-400 mt-2">
              Email: maxi.gartner@hotmail.com
            </p>
            <p className="text-gray-400">Phone: +54 343 5329910</p>
          </div>

          <div>
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/maxi-gartner"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.8 8.207 11.388.6.111.793-.26.793-.577 0-.285-.011-1.236-.017-2.236-3.338.724-4.043-1.608-4.043-1.608-.546-1.384-1.333-1.754-1.333-1.754-1.086-.742.082-.727.082-.727 1.204.085 1.837 1.237 1.837 1.237 1.068 1.826 2.803 1.297 3.487.992.108-.774.42-1.297.763-1.597-2.665-.303-5.467-1.334-5.467-5.928 0-1.311.468-2.384 1.236-3.22-.124-.303-.536-1.52.117-3.168 0 0 1.007-.322 3.296 1.229a11.464 11.464 0 013.003-.404c1.018 0 2.042.138 3.003.404 2.29-1.551 3.296-1.229 3.296-1.229.653 1.648.242 2.865.118 3.168.77.836 1.236 1.909 1.236 3.22 0 4.607-2.807 5.62-5.473 5.923.431.373.817 1.104.817 2.223 0 1.606-.014 2.898-.017 3.292 0 .318.19.694.798.577A12.001 12.001 0 0024 12.297c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/maxi.gartner/"
                className="text-gray-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm6 15.383c0 1.453-.048 2.726-.174 4.031-.095 1.032-.321 1.793-1.122 2.407-1.07.872-2.017.722-2.99.722-3.958 0-8.072-.025-12.052 0-1.474.017-2.233-1.05-2.233-2.055v-11.07c0-1.006.755-2.054 2.233-2.055h12.052c1.002 0 2.055.751 2.055 2.055v11.07zm-6-7.383c-3.035 0-5.484 2.419-5.484 5.481 0 3.036 2.449 5.484 5.484 5.484 3.035 0 5.484-2.448 5.484-5.484 0-3.062-2.449-5.481-5.484-5.481zm0 8.699c-1.775 0-3.217-1.443-3.217-3.217 0-1.776 1.442-3.217 3.217-3.217 1.774 0 3.217 1.441 3.217 3.217 0 1.774-1.443 3.217-3.217 3.217zm5.238-9.8c-.643 0-1.191-.519-1.191-1.174 0-.645.548-1.174 1.191-1.174s1.175.529 1.175 1.174c0 .655-.532 1.174-1.175 1.174z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.004c-5.524 0-10 4.476-10 10s4.476 10 10 10 10-4.476 10-10-4.476-10-10-10zm0 18c-4.419 0-8-3.581-8-8s3.581-8 8-8 8 3.581 8 8-3.581 8-8 8zm-2-12h4v4h-4v-4zm0 6h4v4h-4v-4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
