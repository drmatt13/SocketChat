import { useState, useContext, useEffect, useRef } from "react";

// context
import AppContext from "@/context/AppContext";

const ChooseUsername = () => {
  const { setUser, initialLoad, mobile } = useContext(AppContext);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Validation checks for username
  const isValidUsername = (username: string) => {
    const hasNoSpaces = !/\s/.test(username);
    const hasNoBadSpecialChars = /^[a-zA-Z0-9_-]*$/.test(username);
    const isWithinCharLimit = username.length >= 3 && username.length <= 20;
    return hasNoSpaces && hasNoBadSpecialChars && isWithinCharLimit;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidUsername(name)) {
      setUser({ name });
    }
  };

  useEffect(() => {
    if (!initialLoad) inputRef.current?.focus();
  }, [initialLoad, name]);

  return (
    <>
      {initialLoad && (
        <div className="animate-pulse w-screen flex justify-center pt-[16.5rem] sm:pt-0 sm:items-center sm:h-dvh">
          loading...
        </div>
      )}
      <div
        className={`${
          initialLoad
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } sticky top-0 w-full h-full flex flex-col items-center pt-56 sm:pt-0 sm:justify-center transition-opacity`}
      >
        <form onSubmit={onSubmit}>
          <div>
            <div className="flex h-12 rounded-md overflow-hidden shadow-lg bg-white dark:bg-zinc-700">
              <div className="w-12 h-full flex justify-center items-center bg-black/30 dark:bg-black/10">
                <i className="fa-solid fa-user text-black/80 dark:text-white/60"></i>
              </div>
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="choose a username"
                className="w-64 p-3 outline-none caret-black dark:caret-white dark:placeholder-gray-300/50 bg-white/5"
                maxLength={25}
              />
            </div>
            <input
              type="submit"
              disabled={!isValidUsername(name)}
              className={`${
                isValidUsername(name)
                  ? `${
                      mobile
                        ? "active:bg-blue-400 dark:active:bg-blue-500"
                        : "hover:bg-blue-400 dark:hover:bg-blue-500"
                    } bg-blue-500 dark:bg-blue-600 text-white cursor-pointer`
                  : "bg-black/30 dark:bg-neutral-600 dark:opacity-60 dark:text-black cursor-not-allowed"
              } mt-2.5 rounded-md w-full h-12 transition-colors`}
              value={"Set Username"}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChooseUsername;
