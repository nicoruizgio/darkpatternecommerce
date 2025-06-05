import { useState, useEffect } from "react";

export default function Cookies({ isEnabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
    functionality: true,
    thirdParty: true,
  });

  useEffect(() => {
    if (isEnabled) {
      setIsOpen(true);
    }
  }, [isEnabled]);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        functionality: true,
        thirdParty: true,
      })
    );
    setIsOpen(false);
  };

  const handleManageCookies = () => {
    setShowSettings(true);
  };

  const handleSave = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(cookiePreferences)
    );
    setIsOpen(false);
  };

  const handleCookieChange = (cookieType) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        {!showSettings ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              This website uses cookies
            </h2>
            <p className="mb-6 text-gray-600">
              We use cookies to improve user experiences. You can choose what
              cookies you want us to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleManageCookies}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Manage cookies
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Accept and continue
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Cookie settings</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="necessary"
                  checked={cookiePreferences.necessary}
                  onChange={() => handleCookieChange("necessary")}
                  className="h-4 w-4 mr-2"
                  disabled={true} // Strictly necessary cookies cannot be disabled
                />
                <label htmlFor="necessary" className="text-gray-700">
                  Strictly Necessary
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={cookiePreferences.analytics}
                  onChange={() => handleCookieChange("analytics")}
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="analytics" className="text-gray-700">
                  Analytics
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={cookiePreferences.marketing}
                  onChange={() => handleCookieChange("marketing")}
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="marketing" className="text-gray-700">
                  Marketing
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="functionality"
                  checked={cookiePreferences.functionality}
                  onChange={() => handleCookieChange("functionality")}
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="functionality" className="text-gray-700">
                  Functionality
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="thirdParty"
                  checked={cookiePreferences.thirdParty}
                  onChange={() => handleCookieChange("thirdParty")}
                  className="h-4 w-4 mr-2"
                />
                <label htmlFor="thirdParty" className="text-gray-700">
                  Third Party
                </label>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}
