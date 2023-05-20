import { IconNotebook } from '@tabler/icons-react';
import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PluginID, PluginKey } from '@/types/plugin';

import HomeContext from '@/pages/api/home/home.context';

import { SidebarButton } from '@/components/Sidebar/SidebarButton';

import ChatbarContext from '../Chatbar.context';

export const PluginKeys = () => {
  const { t } = useTranslation('sidebar');

  const {
    state: { pluginKeys },
  } = useContext(HomeContext);

  const { handlePluginKeyChange, handleClearPluginKey } =
    useContext(ChatbarContext);

  const [isChanging, setIsChanging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsChanging(false);
    }
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      setIsChanging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      <SidebarButton
        text={t('Documentation')}
        icon={<IconNotebook size={18} />}
        onClick={() => setIsChanging(true)}
      />

      {isChanging && (
        <div
          className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onKeyDown={handleEnter}
        >
          <div className="fixed inset-0 z-10 overflow-hidden">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              />

              <div
                ref={modalRef}
                className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-5xl sm:p-6 sm:align-middle"
                role="dialog"
              >
                <div className="mb-10 text-4xl">Documentation</div>

                <div className="mt-6 rounded border p-4">
                  <div className="text-xl font-bold">TODO: Add Docs</div>
                  <div className="mt-4 italic">
                    TODO: Add more docs ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
