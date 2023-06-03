import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import defaults from "../../../../utils/defaults";
import { FaceSmileIcon as FaceSmileIconOutline } from "@heroicons/react/24/outline";

const SelectMod = ({ onChange }) => {
  const [selectedMod, setSelectedMod] = useState(defaults.moods[0]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const hadndleOnChange = (mod: any) => {
    setSelectedMod(mod);
    onChange(mod);
  };

  return (
    <div>
      {" "}
      <div className="flow-root">
        <Listbox value={selectedMod} onChange={hadndleOnChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative icon-new-post ">
                  <span className="flex items-center justify-center">
                    {selectedMod.value === null ? (
                      <span>
                        <FaceSmileIconOutline
                          className="h-6 w-6 icon-new-post "
                          aria-hidden="true"
                        />
                        <span className="sr-only"> Add your mood </span>
                      </span>
                    ) : (
                      <span>
                        <span
                          className={classNames(
                            selectedMod.bgColor,
                            "flex h-8 w-8 items-center justify-center rounded-full"
                          )}
                        >
                          <selectedMod.icon
                            className="h-5 w-5 flex-shrink-0 text-white"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="sr-only">{selectedMod.name}</span>
                      </span>
                    )}
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                    {defaults.moods.map((mood) => (
                      <Listbox.Option
                        key={mood.value}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-gray-100" : "bg-white",
                            "relative cursor-default select-none py-2 px-3"
                          )
                        }
                        value={mood}
                      >
                        <div className="flex items-center">
                          <div
                            className={classNames(
                              mood.bgColor,
                              "w-8 h-8 rounded-full flex items-center justify-center"
                            )}
                          >
                            <mood.icon
                              className={classNames(
                                mood.iconColor,
                                "flex-shrink-0 h-5 w-5"
                              )}
                              aria-hidden="true"
                            />
                          </div>
                          <span className="ml-3 block truncate font-medium">
                            {mood.name}
                          </span>
                        </div>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default SelectMod;
